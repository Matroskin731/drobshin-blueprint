import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { RequestForm } from "@/components/RequestForm";
import { Calculator } from "@/components/Calculator";
import { useState } from "react";

const Wholesale = () => {
  const { config } = useSiteConfig();
  const [calcMessage, setCalcMessage] = useState("");

  return (
    <div>
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Оптовые поставки</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Резиновая крошка, плитка и бесшовные покрытия оптом от производителя
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="space-y-12">
            {config.products.filter((c) => c.visible).map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.items.filter((i) => i.visible).map((item) => (
                    <Card key={item.id} className="card-hover">
                      <CardContent className="pt-6">
                        <div className="h-2 w-12 rounded-full bg-primary/20 mb-4" />
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-primary">
                          <CheckCircle className="h-3.5 w-3.5" />
                          В наличии
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Calculator onRequestQuote={(a, t, w) => {
              setCalcMessage(`Калькулятор: ${a} м², ${t} мм, ≈${w} кг`);
              document.getElementById("wholesale-form")?.scrollIntoView({ behavior: "smooth" });
            }} />
            <div id="wholesale-form">
              <RequestForm source="оптовые поставки" prefillMessage={calcMessage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wholesale;
