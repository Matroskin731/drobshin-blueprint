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
  const prefill = `Расчёт с калькулятора:\n• Площадь: ${area} м²\n• Толщина: ${thickness} мм\n• Ориентировочный вес крошки: ${weight} кг`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Запрос точного расчёта</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground rounded-md bg-muted p-3 mb-2">
          <p>Площадь: <strong>{area} м²</strong></p>
          <p>Толщина: <strong>{thickness} мм</strong></p>
          <p>Ориентировочный вес: <strong>{weight} кг</strong></p>
        </div>
        <RequestForm source="калькулятор" prefillMessage={prefill} />
      </DialogContent>
    </Dialog>
  );
}
