import { useState } from "react";

const COLORS = [
  { name: "Чёрный", hex: "#2C2C2C" },
  { name: "Красный", hex: "#C62828" },
  { name: "Зелёный", hex: "#2E7D32" },
  { name: "Синий", hex: "#1565C0" },
  { name: "Жёлтый", hex: "#F9A825" },
  { name: "Оранжевый", hex: "#E65100" },
  { name: "Коричневый", hex: "#5D4037" },
];

const SEAMLESS_THICKNESSES = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100];

const BASE_OPTIONS = ["Твёрдое основание", "Трамбованное насыпное основание"];

type Props = {
  itemId: string;
  categoryId: string;
};

export function ProductOptions({ itemId, categoryId }: Props) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<number | null>(null);
  const [seamlessColors, setSeamlessColors] = useState<string>("one");

  const isCrumbColor = categoryId === "crumb" && itemId === "crumb-color";
  const isTile = categoryId === "tiles";
  const isTileWithBase = isTile && (itemId === "tile-40" || itemId === "tile-50");
  const isSeamless = categoryId === "seamless";

  if (!isCrumbColor && !isTile && !isSeamless) return null;

  return (
    <div className="space-y-2.5">
      {/* Color picker for: SBR crumb, tiles, seamless */}
      {(isCrumbColor || isTile || isSeamless) && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1.5">
            {isSeamless ? "Цвет покрытия" : isTile ? "Цвет верхнего слоя" : "Цвет крошки"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c.hex}
                title={c.name}
                onClick={() => setSelectedColor(selectedColor === c.hex ? null : c.hex)}
                className="h-6 w-6 rounded-full border-2 transition-all duration-200"
                style={{
                  backgroundColor: c.hex,
                  borderColor: selectedColor === c.hex ? "hsl(var(--primary))" : "transparent",
                  boxShadow: selectedColor === c.hex ? "0 0 0 2px hsl(var(--primary) / 0.3)" : "none",
                }}
              />
            ))}
          </div>
          {selectedColor && (
            <p className="text-[10px] text-muted-foreground mt-1">
              {COLORS.find((c) => c.hex === selectedColor)?.name}
            </p>
          )}
        </div>
      )}

      {/* Seamless: color count */}
      {isSeamless && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1.5">Количество цветов</p>
          <div className="flex gap-1.5">
            {[
              { value: "one", label: "Один цвет" },
              { value: "multi", label: "Несколько цветов" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSeamlessColors(opt.value)}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors duration-200 ${
                  seamlessColors === opt.value
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Seamless: thickness selector */}
      {isSeamless && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1.5">Толщина, мм</p>
          <div className="flex flex-wrap gap-1.5">
            {SEAMLESS_THICKNESSES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedThickness(selectedThickness === t ? null : t)}
                className={`text-[11px] px-2 py-1 rounded-md border transition-colors duration-200 ${
                  selectedThickness === t
                    ? "border-primary bg-primary/10 text-foreground font-medium"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tile 40/50: base type */}
      {isTileWithBase && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1.5">Тип основания</p>
          <div className="flex flex-col gap-1.5">
            {BASE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedBase(selectedBase === opt ? null : opt)}
                className={`text-[11px] px-2.5 py-1.5 rounded-md border text-left transition-colors duration-200 ${
                  selectedBase === opt
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
