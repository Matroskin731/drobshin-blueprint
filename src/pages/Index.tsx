import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Shield, Truck, CheckCircle, Factory, Award, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { RequestForm } from "@/components/RequestForm";
import { Calculator } from "@/components/Calculator";
import { useState } from "react";

const Index = () => {
  const { config, isBlockVisible } = useSiteConfig();
  const [calcMessage, setCalcMessage] = useState("");

  const handleCalcQuote = (area: number, thickness: number, weight: number) => {
    setCalcMessage(`Калькулятор: площадь ${area} м², толщина ${thickness} мм, ≈${weight} кг крошки`);
    document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero */}
      {isBlockVisible("hero") && (
        <section className="hero-gradient section-padding">
          <div className="section-container text-center">
            <span className="badge-primary mb-4 inline-block border border-primary/30 bg-primary/20 text-primary-foreground">
              С 2007 года
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Переработка шин.
              <br />
              <span className="text-primary" style={{ color: "hsl(152, 55%, 50%)" }}>Резиновая крошка и покрытия.</span>
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-8">
              Производим резиновую крошку, плитку и бесшовные покрытия из переработанных шин. Оптом по всей России.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild className="text-base">
                <Link to="/wholesale">Продукция и цены</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#request-form">Оставить заявку</a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* About preview */}
      {isBlockVisible("about-preview") && (
        <section className="section-padding">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">О заводе «ДробШин»</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ООО «Нижегородский завод по переработке РТИ» — одно из ведущих предприятий по переработке автомобильных шин и резинотехнических изделий в Нижегородской области.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  С 2007 года мы превращаем отходы в качественную продукцию: резиновую крошку различных фракций, плитку и бесшовные покрытия для спортивных и детских площадок.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/about">Подробнее о заводе <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Factory, label: "Собственное производство", value: "2 линии" },
                  { icon: Recycle, label: "Переработка шин", value: "5000+ т/год" },
                  { icon: Truck, label: "Доставка", value: "По всей РФ" },
                  { icon: Award, label: "Опыт работы", value: "17+ лет" },
                ].map((item, i) => (
                  <Card key={i} className="card-hover text-center p-4">
                    <item.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-bold text-lg">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      {isBlockVisible("products") && (
        <section className="section-alt section-padding">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Наша продукция</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {config.products.filter((p) => p.visible).map((category) => (
                <Card key={category.id} className="card-hover">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <ul className="space-y-1.5">
                      {category.items.filter((i) => i.visible).map((item) => (
                        <li key={item.id} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <Link to="/wholesale">Подробнее</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      {isBlockVisible("why-us") && (
        <section className="section-padding">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Почему выбирают нас</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Factory, title: "Собственное производство", desc: "Полный цикл переработки на своих мощностях" },
                { icon: Shield, title: "Гарантия качества", desc: "Продукция соответствует ГОСТ и экологическим стандартам" },
                { icon: Truck, title: "Логистика по РФ", desc: "Организуем доставку в любой регион России" },
                { icon: Users, title: "Индивидуальный подход", desc: "Гибкие условия для оптовых покупателей" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How we work */}
      {isBlockVisible("how-we-work") && (
        <section className="section-alt section-padding">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Как мы работаем</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните" },
                { step: "02", title: "Расчёт", desc: "Подберём продукцию и рассчитаем стоимость" },
                { step: "03", title: "Производство", desc: "Изготовим продукцию под ваш заказ" },
                { step: "04", title: "Доставка", desc: "Отгрузим и доставим в ваш регион" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <span className="text-5xl font-extrabold text-primary/10">{item.step}</span>
                  <h3 className="font-semibold mt-1 mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guarantees */}
      {isBlockVisible("guarantees") && (
        <section className="section-padding">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold mb-10">Гарантии и соответствие</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: FileCheck, title: "Сертификаты", desc: "Вся продукция сертифицирована" },
                { icon: Shield, title: "Экологичность", desc: "Безопасные материалы, переработка отходов" },
                { icon: Award, title: "ГОСТ", desc: "Соответствие государственным стандартам" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <item.icon className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calculator + Request Form */}
      {isBlockVisible("request-form") && (
        <section id="request-form" className="section-alt section-padding">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Рассчитайте и закажите</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Calculator onRequestQuote={handleCalcQuote} />
              <RequestForm source="главная" prefillMessage={calcMessage} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
