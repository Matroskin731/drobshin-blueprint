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

  const hasSelection = selectedColor || selectedBase || selectedThickness;

  return (
    <div className="space-y-2.5">
      {/* Color picker */}
      {(isCrumbColor || isTile || isSeamless) && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1.5">
            {isSeamless ? "Цвет покрытия" : isTile ? "Цвет верхнего слоя" : "Цвет крошки"}
          </p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => {
              const isActive = selectedColor === c.hex;
              return (
                <button
                  key={c.hex}
                  title={c.name}
                  onClick={() => setSelectedColor(isActive ? null : c.hex)}
                  className="h-7 w-7 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-md"
                  style={{
                    backgroundColor: c.hex,
                    borderColor: isActive ? "#2E7D32" : "transparent",
                    boxShadow: isActive
                      ? "0 0 0 2px rgba(46,125,50,0.35), 0 0 10px rgba(46,125,50,0.25)"
                      : "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              );
            })}
          </div>
          {selectedColor && (
            <p className="text-[10px] text-primary mt-1 font-medium">
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
            ].map((opt) => {
              const isActive = seamlessColors === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setSeamlessColors(opt.value)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 hover:border-primary/40 hover:bg-muted/50 ${
                    isActive
                      ? "border-primary bg-primary/10 text-foreground font-medium shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_0_8px_hsl(var(--primary)/0.12)]"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Seamless: thickness selector */}
      {isSeamless && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1.5">Толщина, мм</p>
          <div className="flex flex-wrap gap-1.5">
            {SEAMLESS_THICKNESSES.map((t) => {
              const isActive = selectedThickness === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedThickness(isActive ? null : t)}
                  className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all duration-200 hover:border-primary/40 hover:bg-muted/50 ${
                    isActive
                      ? "border-primary bg-primary/10 text-foreground font-medium shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_0_8px_hsl(var(--primary)/0.12)]"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tile 40/50: base type */}
      {isTileWithBase && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1.5">Тип основания</p>
          <div className="flex flex-col gap-1.5">
            {BASE_OPTIONS.map((opt) => {
              const isActive = selectedBase === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setSelectedBase(isActive ? null : opt)}
                  className={`text-[11px] px-3 py-2 rounded-lg border text-left transition-all duration-200 hover:border-primary/40 hover:bg-muted/50 ${
                    isActive
                      ? "border-primary bg-primary/10 text-foreground font-medium shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_0_8px_hsl(var(--primary)/0.12)]"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hint text */}
      {hasSelection && (
        <p className="text-[10px] text-muted-foreground/70 italic">
          Выбранные параметры будут учтены при расчёте стоимости
        </p>
      )}
    </div>
  );
}
