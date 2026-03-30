import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Palette, PaintBucket } from "lucide-react";
import { RequestForm } from "@/components/RequestForm";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const PRODUCTS = [
  {
    icon: Droplets,
    title: "Полиуретановый клей",
    description:
      "Используется для укладки бесшовных покрытий и производства резиновой плитки. Обеспечивает прочное сцепление и долговечность покрытия.",
  },
  {
    icon: Palette,
    title: "Пигменты для окрашивания",
    description:
      "Добавляются в крошку для получения цветных покрытий. Устойчивы к ультрафиолету и выцветанию.",
  },
  {
    icon: PaintBucket,
    title: "Грунтовка",
    description:
      "Применяется для подготовки основания перед укладкой покрытия. Улучшает адгезию и увеличивает срок службы.",
  },
];

const Accessories = () => {
  const heroRef = useScrollReveal();
  const cardsStagger = useStaggerReveal(3, 100, 100);
  const formRef = useScrollReveal();

  const scrollToForm = () => {
    document.getElementById("accessories-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <section className="hero-gradient py-16" ref={heroRef}>
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">
            Сопутствующие материалы для резиновых покрытий
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Поставляем все необходимые материалы для укладки покрытий под ключ
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PRODUCTS.map((product, i) => (
              <Card key={product.title} ref={cardsStagger(i)} className="card-hover">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <product.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="font-bold text-lg">{product.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <Button size="sm" className="w-full" onClick={scrollToForm}>
                    Запросить цену
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="accessories-form"
        className="section-padding"
        style={{ background: "hsl(var(--dark-light))", color: "hsl(var(--hero-foreground))" }}
        ref={formRef}
      >
        <div className="section-container max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Оставить заявку</h2>
          <RequestForm source="сопутствующие товары" />
        </div>
      </section>
    </div>
  );
};

export default Accessories;
