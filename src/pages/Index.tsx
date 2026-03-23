import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Shield, Truck, Factory, Award, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { RequestForm } from "@/components/RequestForm";
import { Calculator } from "@/components/Calculator";
import { QuoteModal } from "@/components/QuoteModal";
import { ProductCatalogSection } from "@/components/ProductCatalogSection";
import { useState } from "react";
import heroFactory from "@/assets/hero-factory.jpg";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  const { config, isBlockVisible } = useSiteConfig();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState({ area: 0, thickness: 0, weight: 0 });

  const handleCalcQuote = (area: number, thickness: number, weight: number) => {
    setQuoteData({ area, thickness, weight });
    setQuoteOpen(true);
  };

  const aboutRef = useScrollReveal();
  const whyUsRef = useScrollReveal();
  const howRef = useScrollReveal();
  const guaranteesRef = useScrollReveal();
  const formRef = useScrollReveal();

  const statStagger = useStaggerReveal(4, 100, 100);
  const whyStagger = useStaggerReveal(4, 100, 80);
  const stepStagger = useStaggerReveal(4, 100, 100);
  const guaranteeStagger = useStaggerReveal(3, 100, 80);

  return (
    <div>
      {/* Hero */}
      {isBlockVisible("hero") && (
        <section className="hero-photo relative overflow-hidden">
          <div
            className="hero-photo__bg absolute inset-0"
            style={{ backgroundImage: `url(${heroFactory})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 hero-photo__overlay" aria-hidden="true" />

          <div className="section-container section-padding relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-[2.25rem] md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.25] md:leading-tight text-white">
                Утилизация отходов РТИ.
                <br />
                <span className="text-primary">Резиновая крошка и покрытия.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
                Производим резиновую крошку, плитку и бесшовные покрытия из утилизированных шин.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="text-base">
                  <Link to="/wholesale">Продукция и цены</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base border-white/30 text-white/90 bg-white/5 hover:bg-white/15 hover:text-white hover:border-white/50">
                  <a href="#request-form">Оставить заявку</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About preview */}
      {isBlockVisible("about-preview") && (
        <section className="section-padding" ref={aboutRef}>
          <div className="section-container">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-4">О заводе «ДробШин»</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Современное производство с полным циклом утилизации и строгим контролем качества.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  С 2007 года мы превращаем отходы в качественную продукцию: резиновую крошку различных фракций, плитку и бесшовные покрытия для спортивных и детских площадок.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/about">Подробнее о заводе <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Factory, label: "Собственное производство", value: "2 линии" },
                  { icon: Recycle, label: "Переработка шин", value: "5000+ т/год" },
                  { icon: Shield, label: "Качество продукции", value: "ГОСТ Р 59228-2020" },
                  { icon: Users, label: "Постоянных клиентов", value: "500+" },
                ].map((item, i) => (
                  <div key={i} ref={statStagger(i)} className="stat-card text-center p-5">
                    <div className="mx-auto mb-3 h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-bold text-lg text-white">{item.value}</p>
                    <p className="text-xs text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {isBlockVisible("products") && <ProductCatalogSection />}

      {/* Why us */}
      {isBlockVisible("why-us") && (
        <section className="section-padding" ref={whyUsRef}>
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Почему выбирают нас</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { icon: Factory, title: "Собственное производство", desc: "Полный цикл переработки на своих мощностях" },
                { icon: Shield, title: "Гарантия качества", desc: "Продукция соответствует ГОСТ и экологическим стандартам" },
                { icon: Truck, title: "Логистика по РФ", desc: "Организуем доставку в любой регион России" },
                { icon: Users, title: "Индивидуальный подход", desc: "Гибкие условия для оптовых покупателей" },
              ].map((item, i) => (
                <div key={i} ref={whyStagger(i)} className="unified-card text-center p-6">
                  <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How we work */}
      {isBlockVisible("how-we-work") && (
        <section className="section-padding" style={{ background: "hsl(var(--dark-mid))", color: "hsl(var(--hero-foreground))" }} ref={howRef}>
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Как мы работаем</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните" },
                { step: "02", title: "Расчёт", desc: "Подберём продукцию и рассчитаем стоимость" },
                { step: "03", title: "Производство", desc: "Изготовим продукцию под ваш заказ" },
                { step: "04", title: "Доставка", desc: "Отгрузим и доставим в ваш регион" },
              ].map((item, i) => (
                <div key={i} ref={stepStagger(i)} className="relative pl-4 border-l-2 border-primary/40">
                  <span className="text-4xl font-extrabold text-white/30 leading-none">{item.step}</span>
                  <h3 className="font-bold mt-2 mb-1 text-white">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guarantees */}
      {isBlockVisible("guarantees") && (
        <section className="section-padding" ref={guaranteesRef}>
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold mb-10">Гарантии и соответствие</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: FileCheck, title: "Сертификаты", desc: "Вся продукция сертифицирована" },
                { icon: Shield, title: "Экологичность", desc: "Безопасные материалы, переработка отходов" },
                { icon: Award, title: "ГОСТ", desc: "Соответствие государственным стандартам" },
              ].map((item, i) => (
                <div key={i} ref={guaranteeStagger(i)} className="unified-card flex flex-col items-center p-6">
                  <item.icon className="h-10 w-10 text-foreground mb-3" />
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calculator + Request Form */}
      {isBlockVisible("request-form") && (
        <section id="request-form" className="section-padding" style={{ background: "hsl(var(--dark-light))", color: "hsl(var(--hero-foreground))" }} ref={formRef}>
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Рассчитайте и закажите</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Calculator onRequestQuote={handleCalcQuote} />
              <RequestForm source="главная" />
            </div>
          </div>
        </section>
      )}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        area={quoteData.area}
        thickness={quoteData.thickness}
        weight={quoteData.weight}
      />
    </div>
  );
};

export default Index;
