import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Cable, CircleDot, Grip } from "lucide-react";
import { RequestForm } from "@/components/RequestForm";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const PRODUCTS = [
  {
    icon: Cable,
    title: "Текстильный корд",
    description:
      "Доступный и качественный аналог ЭкоВаты с небольшим вкраплением резиновой крошки.",
    applications: [
      "При тампонировании скважин в качестве компонента смеси",
      "Для изготовления сорбента для сбора нефти и нефтепродуктов",
      "В перерабатывающей промышленности",
      "В качестве утеплителя, связующего, армирующего компонента",
      "Специальная добавка для эластичности строительных материалов",
      "Для изготовления фибробетона",
    ],
  },
  {
    icon: Grip,
    title: "Металлический корд",
    description:
      "Продукт переработки шин, представляющий собой высоколегированную сталь.",
  },
  {
    icon: CircleDot,
    title: "Бортовое кольцо",
    description:
      "Бортовое кольцо от шин и покрышек после переработки.",
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
      <SEO title="Сопутствующие товары — ДробШин" description="Текстильный корд, металлокорд и бортовое кольцо — продукты утилизации шин и покрышек от производителя." />
      <section className="hero-gradient py-16" ref={heroRef}>
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Сопутствующие товары</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            В результате утилизации шин и покрышек образуются следующие товары: текстильный корд, металлокорд, бортовое кольцо.
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
                  <p className="text-sm text-foreground/65 leading-relaxed">
                    {product.description}
                  </p>
                  {product.applications && (
                    <div>
                      <p className="text-sm font-semibold mb-2">Применение:</p>
                      <ul className="space-y-1">
                        {product.applications.map((app, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-foreground/65 leading-snug">
                            <CheckCircle className="h-3 w-3 mt-0.5 shrink-0" style={{ color: "#43A047" }} />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-sm font-medium text-foreground/60 italic">Цена за кг — по запросу</p>
                  <Button size="sm" className="w-full" onClick={scrollToForm}>
                    Получить расчёт
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
