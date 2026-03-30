import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { ArrowRight, Recycle, Shield, Truck, Factory, Award, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { RequestForm } from "@/components/RequestForm";
import { Calculator } from "@/components/Calculator";
import { QuoteModal } from "@/components/QuoteModal";
import { ProductCatalogSection } from "@/components/ProductCatalogSection";
import { DocumentsSection } from "@/components/DocumentsSection";
import { useState, useEffect, useRef } from "react";
import heroFactory from "@/assets/hero-factory.jpg";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedStat({ num, suffix, format, inView }: { num: number; suffix: string; format: boolean; inView: boolean }) {
  const value = useCountUp(num, inView, 1500);
  const display = format ? value.toLocaleString("ru-RU") : String(value);
  return <p className="text-3xl lg:text-4xl font-extrabold text-primary leading-none">{display}{suffix}</p>;
}

const Index = () => {
  const { config, isBlockVisible } = useSiteConfig();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState({ area: 0, thickness: 0, weight: 0 });

  const handleCalcQuote = (area: number, thickness: number, weight: number) => {
    setQuoteData({ area, thickness, weight });
    setQuoteOpen(true);
  };

  const aboutRef = useRef<HTMLElement>(null);
  const aboutRevealRef = useScrollReveal();
  const [aboutInView, setAboutInView] = useState(false);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAboutInView(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
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
              <h1 className="text-[2.25rem] md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.25] md:leading-tight text-white drop-shadow-lg">
                Утилизация отходов РТИ.
                <br />
                <span className="text-primary">Резиновая крошка и покрытия.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
                Производим резиновую крошку, плитку и бесшовные покрытия из утилизированных шин.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="text-base h-13 px-10 text-[15px]">
                  <Link to="/wholesale">Продукция и цены</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base border-white/20 text-white/70 bg-white/5 hover:bg-white/10 hover:text-white/90 hover:border-white/30">
                  <a href="#request-form">Оставить заявку</a>
                </Button>
              </div>
              <a href="tel:+79877404062" className="inline-flex items-center gap-2 mt-8 text-sm text-white/50 hover:text-white/75 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+7 (987) 740-40-62 — ответим в течение 10 минут</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About preview */}
      {isBlockVisible("about-preview") && (
        <section className="section-padding section-dark" ref={aboutRef}>
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Почему нам доверяют</h2>
              <p className="text-white/60 max-w-xl mx-auto">Собственное производство полного цикла с 2007 года</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {[
                { num: 2400, suffix: "+", unit: "тонн/год", title: "Переработки", desc: "Полный цикл утилизации отходов РТИ", format: true },
                { num: 17, suffix: "+", unit: "лет", title: "На рынке", desc: "Работаем с 2007 года", format: false },
                { num: 1000, suffix: "+", unit: "", title: "Клиентов", desc: "Постоянные партнёры по всей России", format: true },
                { num: 2, suffix: "", unit: "линии", title: "Производство", desc: "Собственные мощности", format: false },
              ].map((item, i) => (
                <div key={i} ref={statStagger(i)} className="trust-stat-card text-center p-6 lg:p-8">
                  <AnimatedStat num={item.num} suffix={item.suffix} format={item.format} inView={aboutInView} />
                  {item.unit && <span className="text-sm text-white/50 mt-1 block">{item.unit}</span>}
                  <h3 className="font-bold text-white mt-3 mb-1">{item.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" asChild className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white">
                <Link to="/about">Подробнее о заводе <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {isBlockVisible("products") && <ProductCatalogSection />}

      {/* Why us */}
      {isBlockVisible("why-us") && (
        <section className="section-padding bg-[hsl(210_10%_96%)]" ref={whyUsRef}>
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-10">Почему выбирают нас</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { icon: Factory, title: "Собственное производство", desc: "Полный цикл утилизации на своих мощностях" },
                { icon: Shield, title: "Гарантия качества", desc: "Продукция соответствует ТУ (ГОСТов на данную продукцию не существует)" },
                { icon: Truck, title: "Логистика по РФ", desc: "Организуем доставку в любой регион России" },
                { icon: Users, title: "Индивидуальный подход", desc: "Гибкие условия для оптовых покупателей" },
              ].map((item, i) => (
                <div key={i} ref={whyStagger(i)} className="unified-card text-center p-7">
                  <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
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

      {isBlockVisible("documents") && <DocumentsSection />}

      {/* How we work */}
      {isBlockVisible("how-we-work") && (
        <section className="section-padding section-dark-alt" ref={howRef}>
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
                  <span className="text-4xl font-extrabold text-white/30 leading-none text-left">{item.step}</span>
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
        <section className="section-padding bg-[hsl(210_10%_96%)]" ref={guaranteesRef}>
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold mb-10">Гарантии и соответствие</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: FileCheck, title: "Сертификаты", desc: "Вся продукция сертифицирована" },
                { icon: Shield, title: "Экологичность", desc: "Безопасные материалы, утилизация отходов" },
                { icon: Award, title: "ТУ", desc: "Продукция соответствует ТУ (ГОСТов на данную продукцию не существует)" },
              ].map((item, i) => (
                <div key={i} ref={guaranteeStagger(i)} className="unified-card flex flex-col items-center p-7">
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
        <section id="request-form" className="section-padding section-dark" ref={formRef}>
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
