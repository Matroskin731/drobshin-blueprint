import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Factory, Truck, Recycle, MapPin, Award, Calculator as CalcIcon } from "lucide-react";
import { ProductOptions } from "@/components/ProductOptions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Calculator } from "@/components/Calculator";
import { QuoteModal } from "@/components/QuoteModal";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const FRACTION_FILTERS = [
  { label: "Все", value: "all" },
  { label: "0–1 мм", value: "0-1" },
  { label: "1–2 мм", value: "1-2" },
  { label: "2–4 мм", value: "2-4" },
];

const CRUMB_SPECS: Record<string, string[]> = {};

function matchesFraction(itemName: string, filter: string): boolean {
  if (filter === "all") return true;
  const name = itemName.toLowerCase();
  if (filter === "0-1") return name.includes("0,63") || name.includes("0-1") || name.includes("до 1");
  if (filter === "1-2") return name.includes("1–2") || name.includes("1-2");
  if (filter === "2-4") return name.includes("2–4") || name.includes("2-4");
  return true;
}

export function ProductCatalogSection() {
  const { config } = useSiteConfig();
  const [fractionFilter, setFractionFilter] = useState("all");
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcFraction, setCalcFraction] = useState("");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState({ area: 0, thickness: 0, weight: 0 });

  const sectionRef = useScrollReveal();
  const trustRef = useScrollReveal();
  const trustStagger = useStaggerReveal(5, 100, 80);

  const handleCalcQuote = (area: number, thickness: number, weight: number) => {
    setQuoteData({ area, thickness, weight });
    setCalcOpen(false);
    setQuoteOpen(true);
  };

  const openCalcForItem = (itemName: string) => {
    setCalcFraction(itemName);
    setCalcOpen(true);
  };

  const scrollToForm = () => {
    document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const trustItems = [
    { icon: Recycle, text: "2 400+ тонн утилизированных отходов в год" },
    { icon: Factory, text: "2 производственные линии" },
    { icon: Award, text: "Собственное производство" },
    { icon: MapPin, text: "Работаем с муниципальными объектами" },
    { icon: Truck, text: "Доставка по всей России" },
  ];

  return (
    <>
      <section className="section-alt section-padding" ref={sectionRef}>
        <div className="section-container">
          <h2 className="text-3xl font-bold text-center mb-4">Наша продукция</h2>

          {/* Micro-offer */}
          <Card className="max-w-4xl mx-auto mb-10">
            <CardContent className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-1">
                  Подберём фракцию и бесплатно рассчитаем объём под ваш объект
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Подготовим расчёт и коммерческое предложение в день обращения. Поможем выбрать оптимальную толщину и расход.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm">
                {["Расчёт за 10 минут", "Подбор фракции под задачу", "Консультация инженера"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#43A047" }} />
                    {t}
                  </span>
                ))}
              </div>
              <Button size="sm" onClick={scrollToForm}>Получить бесплатный расчёт</Button>
            </CardContent>
          </Card>

          <div className="space-y-12">
            {config.products.filter((c) => c.visible).map((category) => {
              const isCrumb = category.id === "crumb";
              const filteredItems = category.items
                .filter((i) => i.visible)
                .filter((i) => (isCrumb ? matchesFraction(i.name, fractionFilter) : true));

              return (
                <div key={category.id}>
                  <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>

                  {isCrumb && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {FRACTION_FILTERS.map((f) => (
                        <Button
                          key={f.value}
                          size="sm"
                          variant={fractionFilter === f.value ? "default" : "ghost"}
                          className={fractionFilter !== f.value ? "bg-muted text-foreground hover:bg-muted/80" : ""}
                          onClick={() => setFractionFilter(f.value)}
                        >
                          {f.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {filteredItems.map((item) => (
                      <Card key={item.id} className="card-hover">
                        <CardContent className="p-6 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-lg leading-snug">{item.name}</h4>
                            {isCrumb && item.id === "crumb-1-2" && (
                              <Badge className="text-[10px] border-0 shrink-0" style={{ background: "hsl(30 100% 48%)", color: "#fff" }}>
                                Хит продаж
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground">{item.description}</p>

                          <ProductOptions itemId={item.id} categoryId={category.id} />

                          {isCrumb && CRUMB_SPECS[item.id] && (
                            <ul className="space-y-0.5">
                              {CRUMB_SPECS[item.id].map((spec, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-snug">
                                  <CheckCircle className="h-3 w-3 mt-0.5 shrink-0" style={{ color: "#43A047" }} />
                                  <span>{spec}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#43A047" }}>
                            <CheckCircle className="h-3.5 w-3.5" />
                            В наличии
                          </div>

                          {item.price && item.showPrice ? (
                            <Badge variant="secondary" className="text-sm font-semibold pointer-events-none bg-muted text-foreground">
                              {item.price}
                            </Badge>
                          ) : (
                            <p className="text-sm font-medium text-muted-foreground italic">Цена по запросу</p>
                          )}

                          <p className="text-[11px] text-muted-foreground/70">Производство с 2007 года</p>

                          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                            <Button size="sm" variant="outline" className="w-full sm:w-1/2 text-xs truncate" onClick={() => openCalcForItem(item.name)}>
                              <CalcIcon className="h-3.5 w-3.5 mr-1 shrink-0" />
                              <span className="truncate">Рассчитать объём</span>
                            </Button>
                            <Button size="sm" className="w-full sm:w-1/2 text-xs truncate" onClick={scrollToForm}>
                              Запросить цену
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust block */}
      <section className="section-padding hero-gradient" ref={trustRef}>
        <div className="section-container">
          <h2 className="text-2xl font-bold text-center mb-8">Почему нам доверяют подрядчики</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {trustItems.map((item, i) => (
              <div key={i} ref={trustStagger(i)} className="flex flex-col items-center text-center gap-2">
                <div className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-white/70" />
                </div>
                <p className="text-sm font-medium leading-snug opacity-90">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator modal */}
      {calcOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setCalcOpen(false)}>
          <div className="bg-card rounded-xl shadow-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Калькулятор расхода — {calcFraction}</h3>
              <Button variant="ghost" size="sm" onClick={() => setCalcOpen(false)}>✕</Button>
            </div>
            <div className="p-4">
              <Calculator onRequestQuote={handleCalcQuote} />
            </div>
          </div>
        </div>
      )}

      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        area={quoteData.area}
        thickness={quoteData.thickness}
        weight={quoteData.weight}
      />
    </>
  );
}
