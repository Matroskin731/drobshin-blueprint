import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Phone, ChevronDown } from "lucide-react";
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
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import { fadeUp, ease, viewport } from "@/hooks/useMotion";

function AnimatedStat({ num, suffix, format }: { num: number; suffix: string; format: boolean }) {
  const { count, ref } = useCountUp(num, 1500);
  const display = format ? count.toLocaleString("ru-RU") : String(count);
  return (
    <div ref={ref}>
      <p className="text-3xl lg:text-4xl font-extrabold text-primary leading-none">{display}{suffix}</p>
    </div>
  );
}

const Index = () => {
  const { config, isBlockVisible } = useSiteConfig();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteData, setQuoteData] = useState({ area: 0, thickness: 0, weight: 0 });

  const handleCalcQuote = (area: number, thickness: number, weight: number) => {
    setQuoteData({ area, thickness, weight });
    setQuoteOpen(true);
  };

  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  // Parallax effect on hero bg
  useEffect(() => {
    const bg = heroBgRef.current;
    const section = heroSectionRef.current;
    if (!bg || !section) return;

    let rafId: number;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        if (window.innerWidth >= 768) {
          const rect = section.getBoundingClientRect();
          if (rect.bottom > 0) {
            bg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
          }
        } else {
          bg.style.transform = "";
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const stepsLineRef = useRef<SVGSVGElement>(null);

  // Animate connecting line when "how we work" enters viewport
  useEffect(() => {
    const svg = stepsLineRef.current;
    if (!svg) return;
    const line = svg.querySelector(".steps-connecting-line") as SVGLineElement | null;
    if (!line) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        line.style.transition = "stroke-dashoffset 1.5s ease-out";
        line.style.strokeDashoffset = "0";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <SEO title="ДробШин — Резиновая крошка и покрытия, утилизация РТИ | Нижний Новгород" description="Производим резиновую крошку, плитку и бесшовные покрытия из переработанных шин с 2007 года. Оптовые поставки по всей России." />
      {/* Hero */}
      {isBlockVisible("hero") && (
        <section className="hero-photo relative overflow-hidden" ref={heroSectionRef}>
          <div
            ref={heroBgRef}
            className="hero-photo__bg absolute inset-0 will-change-transform"
            style={{ backgroundImage: `url(${heroFactory})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 hero-photo__overlay" aria-hidden="true" />

          <div className="section-container section-padding relative z-10">
            <div className="max-w-2xl">
              <h1 className="hero-t1 text-[2.25rem] md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.25] md:leading-tight text-white drop-shadow-lg">
                Утилизация отходов РТИ.
                <br />
                <span className="text-primary">Резиновая крошка и покрытия.</span>
              </h1>
              <p className="hero-t2 text-lg md:text-xl text-white/95 max-w-2xl mb-8">
                Производим резиновую крошку, плитку и бесшовные покрытия из утилизированных шин.
              </p>
              <div className="hero-t3 flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="text-base h-13 px-10 text-[15px]">
                  <Link to="/wholesale">Продукция и цены</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base border-white/30 text-white/80 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/60">
                  <a href="#request-form">Оставить заявку</a>
                </Button>
              </div>
              <a href="tel:+79877404062" className="hero-t4 inline-flex items-center gap-2 mt-8 text-sm text-white/60 hover:text-white/90 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+7 (987) 740-40-62 — ответим в течение 10 минут</span>
              </a>
            </div>
          </div>
          <button
            onClick={() => document.getElementById('about-preview')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-t5 text-white/50 hover:text-white/80 transition-colors animate-bounce z-10"
          >
            <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
          </button>
        </section>
      )}

      {/* About preview */}
      {isBlockVisible("about-preview") && (
        <section className="section-dark pt-20 pb-24 md:pb-32" id="about-preview">
          <div className="section-container">
            <div className="text-center mb-12">
              <span className="section-num">01</span>
              <motion.h2
                initial="hidden" whileInView="visible"
                viewport={viewport} variants={fadeUp}
                transition={{ duration: 0.7, ease }}
                className="text-3xl md:text-4xl font-bold mb-3"
              >
                Почему нам доверяют
              </motion.h2>
              <motion.p
                initial="hidden" whileInView="visible"
                viewport={viewport} variants={fadeUp}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                className="text-white/70 max-w-xl mx-auto"
              >
                Собственное производство полного цикла с 2007 года
              </motion.p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {[
                { num: 2400, suffix: "+", unit: "тонн/год", title: "Переработки", desc: "Полный цикл утилизации отходов РТИ", format: true },
                { num: 17, suffix: "+", unit: "лет", title: "На рынке", desc: "Работаем с 2007 года", format: false },
                { num: 1000, suffix: "+", unit: "", title: "Клиентов", desc: "Постоянные партнёры по всей России", format: true },
                { num: 2, suffix: "", unit: "линии", title: "Производство", desc: "Собственные мощности", format: false },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible"
                  viewport={viewport} variants={fadeUp}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease }}
                  className="trust-stat-card text-center p-6 lg:p-8"
                >
                  <AnimatedStat num={item.num} suffix={item.suffix} format={item.format} />
                  {item.unit && <span className="text-sm text-white/50 mt-1 block">{item.unit}</span>}
                  <h3 className="font-bold text-white mt-3 mb-1">{item.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={viewport} variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="text-center mt-10"
            >
              <Button variant="outline" asChild className="btn-fill-slide border-white/25 text-white/80 hover:bg-white/5 hover:text-white hover:border-white/50">
                <Link to="/about">Подробнее о заводе <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {isBlockVisible("products") && <ProductCatalogSection />}

      {/* Why us */}
      {isBlockVisible("why-us") && (
        <section className="section-padding bg-[hsl(210_10%_96%)]">
          <div className="section-container">
            <div className="text-center">
              <span className="section-num-dark">02</span>
            </div>
            <motion.h2
              initial="hidden" whileInView="visible"
              viewport={viewport} variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-3xl md:text-4xl font-bold text-center mb-10"
            >
              Почему выбирают нас
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { icon: Factory, title: "Собственное производство", desc: "Полный цикл утилизации на своих мощностях" },
                { icon: Shield, title: "Гарантия качества", desc: "Продукция соответствует ТУ (ГОСТов на данную продукцию не существует)" },
                { icon: Truck, title: "Логистика по РФ", desc: "Организуем доставку в любой регион России" },
                { icon: Users, title: "Индивидуальный подход", desc: "Гибкие условия для оптовых покупателей" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible"
                  viewport={viewport} variants={fadeUp}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease }}
                  className="unified-card text-center p-7"
                >
                  <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isBlockVisible("documents") && <DocumentsSection />}

      {/* How we work */}
      {isBlockVisible("how-we-work") && (
        <section className="section-padding section-dark-alt">
          <div className="section-container">
            <div className="text-center">
              <span className="section-num">03</span>
            </div>
            <motion.h2
              initial="hidden" whileInView="visible"
              viewport={viewport} variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-3xl md:text-4xl font-bold text-center mb-10"
            >
              Как мы работаем
            </motion.h2>
            <div className="relative">
              {/* Connecting SVG line – xl only */}
              <svg
                ref={stepsLineRef}
                className="hidden xl:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[3px] pointer-events-none"
                style={{ width: "75%", overflow: "visible" }}
                preserveAspectRatio="none"
              >
                <line
                  x1="0" y1="1" x2="100%" y2="1"
                  stroke="hsl(var(--primary))"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="steps-connecting-line"
                />
              </svg>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните" },
                  { step: "02", title: "Расчёт", desc: "Подберём продукцию и рассчитаем стоимость" },
                  { step: "03", title: "Производство", desc: "Изготовим продукцию под ваш заказ" },
                  { step: "04", title: "Доставка", desc: "Отгрузим и доставим в ваш регион" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial="hidden" whileInView="visible"
                    viewport={viewport} variants={fadeUp}
                    transition={{ duration: 0.7, delay: 0.1 * i, ease }}
                    className="relative pl-4 border-l-2 border-primary/40"
                  >
                    <span className="text-5xl font-extrabold text-white/25 leading-none text-left">{item.step}</span>
                    <h3 className="font-bold mt-2 mb-1 text-white">{item.title}</h3>
                    <p className="text-sm text-white/65">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Guarantees */}
      {isBlockVisible("guarantees") && (
        <section className="section-padding bg-[hsl(210_10%_96%)]">
          <div className="section-container text-center">
            <span className="section-num-dark">04</span>
            <motion.h2
              initial="hidden" whileInView="visible"
              viewport={viewport} variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-3xl md:text-4xl font-bold mb-10"
            >
              Гарантии и соответствие
            </motion.h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: FileCheck, title: "Сертификаты", desc: "Вся продукция сертифицирована" },
                { icon: Shield, title: "Экологичность", desc: "Безопасные материалы, утилизация отходов" },
                { icon: Award, title: "ТУ", desc: "Продукция соответствует ТУ (ГОСТов на данную продукцию не существует)" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible"
                  viewport={viewport} variants={fadeUp}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease }}
                  className="unified-card flex flex-col items-center p-7"
                >
                  <item.icon className="h-10 w-10 text-foreground mb-3" />
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calculator + Request Form */}
      {isBlockVisible("request-form") && (
        <section id="request-form" className="section-padding section-dark">
          <div className="section-container">
            <div className="text-center">
              <span className="section-num">05</span>
            </div>
            <motion.h2
              initial="hidden" whileInView="visible"
              viewport={viewport} variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-3xl md:text-4xl font-bold text-center mb-10"
            >
              Рассчитайте и закажите
            </motion.h2>
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
