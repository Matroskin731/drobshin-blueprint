import { SEO } from "@/components/SEO";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { ProductOptions } from "@/components/ProductOptions";
import { RequestForm } from "@/components/RequestForm";
import { Calculator } from "@/components/Calculator";
import { useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

import crumb063Img from "@/assets/products/crumb-063.jpg";
import crumb12Img from "@/assets/products/crumb-1-2.jpg";
import crumb24Img from "@/assets/products/crumb-2-4.jpg";
import crumbColorImg from "@/assets/products/crumb-color.jpg";
import tile20Img from "@/assets/products/tile-20.jpg";
import tile30Img from "@/assets/products/tile-30.jpg";
import tile40Img from "@/assets/products/tile-40.jpg";
import tile50Img from "@/assets/products/tile-50.jpg";
import seamless20Img from "@/assets/products/seamless-20.jpg";

const PRODUCT_IMAGES: Record<string, string> = {
  "crumb-063": crumb063Img,
  "crumb-1-2": crumb12Img,
  "crumb-2-4": crumb24Img,
  "crumb-color": crumbColorImg,
  "tile-20": tile20Img,
  "tile-30": tile30Img,
  "tile-40": tile40Img,
  "tile-50": tile50Img,
  "seamless-cover": seamless20Img,
};

const Wholesale = () => {
  const { config } = useSiteConfig();
  const [calcMessage, setCalcMessage] = useState("");

  const catalogRef = useScrollReveal();
  const formRef = useScrollReveal();

  const scrollToForm = () => {
    document.getElementById("wholesale-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <SEO title="Оптовые поставки резиновой крошки и покрытий — ДробШин" description="Резиновая крошка, плитка и бесшовные покрытия оптом от производителя. Гибкие условия, доставка по России." />
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Оптовые поставки</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Резиновая крошка, плитка и бесшовные покрытия оптом от производителя
          </p>
        </div>
      </section>

      <section className="section-padding" ref={catalogRef}>
        <div className="section-container">
          <div className="space-y-12">
            {config.products.filter((c) => c.visible).map((category) => {
              const items = category.items.filter((i) => i.visible);
              return (
                <div key={category.id}>
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-foreground/70 mb-6">{category.description}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                      <Card key={item.id} className="overflow-hidden card-hover">
                        <CardContent className="pt-0 p-0">
                          {(() => {
                            const imgSrc = PRODUCT_IMAGES[item.id] || item.image;
                            return imgSrc ? (
                              <img src={imgSrc} alt={item.name} className="w-full h-44 object-cover" />
                            ) : (
                              <div className="w-full h-44 bg-muted flex items-center justify-center">
                                <div className="h-2 w-12 rounded-full bg-muted-foreground/20" />
                              </div>
                            );
                          })()}
                          <div className="p-6">
                            <h3 className="font-bold mb-2">{item.name}</h3>
                            <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
                            <ProductOptions itemId={item.id} categoryId={category.id} />
                            <div className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: "#43A047" }}>
                              <CheckCircle className="h-3.5 w-3.5" />
                              В наличии
                            </div>
                            {item.price && item.showPrice ? (
                              <Badge variant="secondary" className="mt-3 text-sm font-semibold pointer-events-none">
                                {item.price}
                              </Badge>
                            ) : (
                              <Button variant="outline" size="sm" className="mt-3" onClick={scrollToForm}>
                                Получить расчёт
                              </Button>
                            )}
                            <p className="text-[10px] text-foreground/50 mt-1">Ответим в течение рабочего дня</p>
                            <p className="text-[10px] text-foreground/45 mt-0.5">Работаем с оптовыми заказами от 1 тонны</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" ref={formRef}>
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
