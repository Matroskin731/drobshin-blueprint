import { SEO } from "@/components/SEO";
import { ShieldCheck, FileText, Truck, Factory, CheckCircle, CreditCard, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Handshake, title: "Заключение договора", desc: "Оформляем договор на утилизацию отходов" },
  { icon: Truck, title: "Сбор и транспортирование", desc: "Организуем вывоз отходов с вашей территории" },
  { icon: Factory, title: "Утилизация на производстве", desc: "Перерабатываем на собственном оборудовании" },
  { icon: FileText, title: "Акты утилизации", desc: "Предоставляем полный пакет документов" },
];

const obligations = [
  { icon: CreditCard, text: "Уплата экологического сбора" },
  { icon: Factory, text: "Самостоятельная утилизация" },
  { icon: Handshake, text: "Заключение договора с утилизатором" },
];

const scrollToForm = () => {
  const el = document.getElementById("request-form");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "/#request-form";
  }
};

const Rop = () => {
  return (
    <div>
      <SEO title="Расширенная ответственность производителя (РОП) — ДробШин" description="Услуги утилизации для выполнения нормативов РОП. Полный пакет документов, включение в реестр утилизаторов." />
      {/* Hero */}
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Расширенная ответственность производителей и&nbsp;импортёров (РОП)
          </h1>
          <p className="text-base sm:text-lg opacity-85 max-w-3xl mx-auto">
            Помогаем производителям и импортёрам выполнить нормативы утилизации в&nbsp;соответствии с&nbsp;законодательством РФ
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="section-container max-w-4xl space-y-12">

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Что такое РОП</h2>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Расширенная ответственность производителей товаров и упаковки (РОП) — механизм экономического регулирования, согласно которому производители и импортёры обязаны обеспечить утилизацию товаров после утраты ими потребительских свойств.
            </p>
          </div>

          {/* Normative base */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Нормативная база</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Субъектами РОП являются производители и импортёры товаров, подлежащих утилизации согласно Распоряжению Правительства РФ №2970-р от&nbsp;28.12.2017.
            </p>
          </div>

          {/* Obligations */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold">Варианты исполнения обязанности</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {obligations.map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <item.icon className="h-7 w-7 text-primary" />
                    <p className="text-sm font-medium">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* About company */}
          <Card className="border-primary/20 bg-primary/[0.03]">
            <CardContent className="p-6 sm:p-8 flex gap-4 items-start">
              <ShieldCheck className="h-8 w-8 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold">Лицензированный утилизатор</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ООО «НЗ ППРТИ» осуществляет деятельность по утилизации отходов на основании лицензии №Л020-00113-52/00043188 от&nbsp;16.04.2018&nbsp;г. и включено в реестр утилизаторов.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How we work */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold">Как мы работаем</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {steps.map((step, i) => (
                <div key={i} className="unified-card flex gap-4 p-5">
                  <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 shrink-0">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-3 pt-4">
            <Button size="lg" onClick={scrollToForm}>
              Получить консультацию по РОП
            </Button>
            <p className="text-xs text-muted-foreground">
              Поможем выполнить нормативы утилизации и избежать штрафов
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Rop;
