import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface RequestFormProps {
  source?: string;
  prefillMessage?: string;
}

export function RequestForm({ source = "сайт", prefillMessage = "" }: RequestFormProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: prefillMessage,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({ title: "Заполните обязательные поля", description: "Укажите имя и телефон", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate sending
    setTimeout(() => {
      toast({ title: "Заявка отправлена!", description: `Источник: ${source}. Мы свяжемся с вами в рабочее время.` });
      setForm({ name: "", phone: "", email: "", message: "" });
      setLoading(false);
    }, 800);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Send className="h-5 w-5 text-foreground" />
          Оставить заявку
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${source}`}>Имя *</Label>
              <Input
                id={`name-${source}`}
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`phone-${source}`}>Телефон *</Label>
              <Input
                id={`phone-${source}`}
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^\d+\s()-]/g, "");
                  setForm({ ...form, phone: val });
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`email-${source}`}>Email</Label>
            <Input
              id={`email-${source}`}
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`message-${source}`}>Сообщение</Label>
            <Textarea
              id={`message-${source}`}
              placeholder="Опишите ваш запрос..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
