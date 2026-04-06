import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RequestForm } from "@/components/RequestForm";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area: number;
  thickness: number;
  weight: number;
}

export function QuoteModal({ open, onOpenChange, area, thickness, weight }: QuoteModalProps) {
  const tonnes = weight >= 1000 ? ` (≈ ${(weight / 1000).toFixed(2)} т)` : "";
  const prefill = `Расчёт с калькулятора:\n• Площадь: ${area} м²\n• Толщина: ${thickness} мм\n• Фракция: 2–4 мм\n• Необходимо крошки: ${weight.toLocaleString("ru-RU")} кг${tonnes}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground font-bold text-lg">Запрос коммерческого предложения</DialogTitle>
        </DialogHeader>

        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 mb-2 space-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Площадь:</span>
            <span className="text-foreground font-semibold">{area} кв.м.</span>
            <span className="text-muted-foreground">Толщина:</span>
            <span className="text-foreground font-semibold">{thickness} мм</span>
            <span className="text-muted-foreground">Фракция:</span>
            <span className="text-foreground font-semibold">2–4 мм</span>
          </div>
          <div className="pt-2 border-t border-primary/20">
            <p className="text-sm text-primary font-medium">Необходимо крошки:</p>
            <p className="text-2xl font-extrabold text-primary mt-0.5">
              {weight.toLocaleString("ru-RU")} кг
            </p>
            {weight >= 1000 && (
              <p className="text-sm text-primary/70">
                ≈ {(weight / 1000).toFixed(2)} тонны
              </p>
            )}
          </div>
        </div>

        <RequestForm source="калькулятор" prefillMessage={prefill} />
      </DialogContent>
    </Dialog>
  );
}
