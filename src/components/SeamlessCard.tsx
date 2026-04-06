import { useState } from "react";
import { CheckCircle, Calculator as CalcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = [
  { color: "#1a1a1a", label: "Чёрный" },
  { color: "#cc2200", label: "Красный" },
  { color: "#2d6a4f", label: "Зелёный" },
  { color: "#1a56db", label: "Синий" },
  { color: "#d97706", label: "Жёлтый" },
  { color: "#ea580c", label: "Оранжевый" },
  { color: "#7c3f00", label: "Коричневый" },
];

const THICKNESSES = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100];

interface SeamlessCardProps {
  onCalculate?: (thickness: number) => void;
  onRequestQuote?: () => void;
  /** Optional image to display at the top */
  image?: string;
}

export function SeamlessCard({ onCalculate, onRequestQuote, image }: SeamlessCardProps) {
  const [selectedThickness, setSelectedThickness] = useState(20);
  const [selectedColor, setSelectedColor] = useState("#1a1a1a");
  const [multiColor, setMultiColor] = useState(false);

  return (
    <div className="unified-card p-7">
      {image && (
        <img src={image} alt="Бесшовное покрытие" className="w-full h-44 object-cover rounded-lg mb-4" />
      )}

      <h3 className="font-bold text-lg mb-1">Бесшовное покрытие</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Монолитное резиновое покрытие различной толщины
      </p>

      {/* Цвет покрытия */}
      <p className="text-xs text-muted-foreground mb-2">Цвет покрытия</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {COLORS.map((c) => (
          <button
            key={c.color}
            title={c.label}
            onClick={() => setSelectedColor(c.color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === c.color ? "border-primary scale-110" : "border-transparent hover:border-primary/50"
            }`}
            style={{ backgroundColor: c.color }}
          />
        ))}
      </div>

      {/* Количество цветов */}
      <p className="text-xs text-muted-foreground mb-2">Количество цветов</p>
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setMultiColor(false)}
          className={`px-4 py-1.5 rounded-lg border-2 text-sm font-medium transition-all ${
            !multiColor ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          Один цвет
        </button>
        <button
          onClick={() => setMultiColor(true)}
          className={`px-4 py-1.5 rounded-lg border-2 text-sm font-medium transition-all ${
            multiColor ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          Несколько цветов
        </button>
      </div>

      {/* Толщина */}
      <p className="text-xs text-muted-foreground mb-2">Толщина, мм</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {THICKNESSES.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedThickness(t)}
            className={`w-12 h-9 rounded-lg border text-sm font-medium transition-all ${
              selectedThickness === t
                ? "border-primary bg-primary/10 text-primary font-bold"
                : "border-border text-muted-foreground hover:border-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Статус */}
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="h-4 w-4" style={{ color: "#43A047" }} />
        <span className="text-sm font-medium" style={{ color: "#43A047" }}>В наличии</span>
      </div>

      {/* Цена */}
      <p className="text-sm font-semibold italic text-foreground/60 mb-1">Цена по запросу</p>
      <p className="text-[11px] text-foreground/55 mb-5">Производство с 2007 года</p>

      {/* Кнопки */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => onCalculate?.(selectedThickness)}
        >
          <CalcIcon className="h-4 w-4" />
          Рассчитать
        </Button>
        <Button size="sm" className="flex-1" onClick={onRequestQuote}>
          Получить расчёт
        </Button>
      </div>
      <p className="text-[10px] text-foreground/50 mt-2 text-center">Ответим в течение рабочего дня</p>
      <p className="text-[10px] text-foreground/45 text-center">Работаем с оптовыми заказами от 1 тонны</p>
    </div>
  );
}
