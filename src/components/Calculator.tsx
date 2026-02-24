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
      // Density of rubber crumb ~600 kg/m³
      const volume = a * (t / 1000); // m³
      const weight = volume * 600; // kg
      setResult(Math.round(weight));
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
          <div className="rounded-lg bg-foreground/5 border border-border p-4 text-center space-y-3">
            <p className="text-sm text-muted-foreground">Ориентировочный вес крошки:</p>
            <p className="text-3xl font-bold text-foreground">{result} кг</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRequestQuote?.(parseFloat(area), parseFloat(thickness), result)}
            >
              Получить точный расчёт
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
