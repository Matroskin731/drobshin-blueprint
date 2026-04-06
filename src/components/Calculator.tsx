import { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CalculatorProps {
  onRequestQuote?: (area: number, thickness: number, weight: number) => void;
}

export function Calculator({ onRequestQuote }: CalculatorProps) {
  const [area, setArea] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(area);
    const t = parseFloat(thickness);
    if (a > 0 && t > 0) {
      // 7 кг крошки фр. 2–4 мм на 1 кв.м. при толщине 10 мм
      const weight = Math.round(a * (t / 10) * 7);
      setResult(weight);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalcIcon className="h-5 w-5 text-foreground" />
          Калькулятор расхода крошки
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calc-area">Площадь (м²)</Label>
            <Input
              id="calc-area"
              type="number"
              min="0"
              step="0.1"
              placeholder="100"
              value={area}
              onChange={(e) => { setArea(e.target.value); setResult(null); }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calc-thickness">Толщина (мм)</Label>
            <Input
              id="calc-thickness"
              type="number"
              min="0"
              step="1"
              placeholder="20"
              value={thickness}
              onChange={(e) => { setThickness(e.target.value); setResult(null); }}
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full">
          Рассчитать
        </Button>

        {result !== null && (
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 space-y-3">
            <div className="space-y-1 text-sm">
              <p className="text-white/70">Площадь: <strong className="text-white font-semibold">{parseFloat(area)} кв.м.</strong></p>
              <p className="text-white/70">Толщина: <strong className="text-white font-semibold">{parseFloat(thickness)} мм</strong></p>
              <p className="text-white/70">Фракция: <strong className="text-white font-semibold">2–4 мм</strong></p>
            </div>
            <div>
              <p className="text-sm text-primary font-medium">Необходимо крошки фр. 2–4 мм:</p>
              <p className="text-3xl font-extrabold text-primary mt-1">
                {result.toLocaleString("ru-RU")} кг
              </p>
              {result >= 1000 && (
                <p className="text-sm text-primary/70 mt-1">
                  ≈ {(result / 1000).toFixed(2)} тонны
                </p>
              )}
            </div>
            <p className="text-xs text-white/50">
              Расчёт на основе: 7 кг крошки фр. 2–4 мм на 1 кв.м. при толщине 10 мм
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onRequestQuote?.(parseFloat(area), parseFloat(thickness), result)}
            >
              Получить коммерческое предложение
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
