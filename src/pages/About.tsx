import { Factory, Recycle, Award, Users, ShieldCheck, FileText, Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const About = () => {
  const scrollToForm = () => {
    document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <SEO title="О заводе ДробШин — Утилизация РТИ с 2007 года" description="ООО «НЗ ППРТИ» — надёжный партнёр в утилизации отходов РТИ. Полный цикл переработки шин, производство резиновой крошки и покрытий." />
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">О заводе «ДробШин»</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            ООО «Нижегородский завод по переработке РТИ» — надёжный партнёр в утилизации отходов РТИ с 2007 года
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <div className="max-w-none space-y-6">
            <p className="text-white/75 leading-relaxed text-base">
              Обработка и утилизация РТИ — сбор, транспортирование, обработка и утилизация автомобильных шин, покрышек, камер и других резинотехнических изделий. Мы производим качественную резиновую крошку различных фракций, а также готовые покрытия: резиновую плитку и бесшовные покрытия.
            </p>
            <p className="text-white/75 leading-relaxed text-base">
              За более чем 17 лет работы мы наладили полный цикл производства — от приёма сырья до выпуска готовой продукции. Наше оборудование позволяет утилизировать более 2400 тонн шин в год, внося вклад в экологию региона.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Factory, title: "2007", desc: "Год основания" },
              { icon: Recycle, title: "2400+ т", desc: "Утилизации в год" },
              { icon: Award, title: "ТУ", desc: "Сертификация" },
              { icon: Users, title: "1000+", desc: "Клиентов" },
            ].map((item, i) => (
              <div key={i} className="unified-card text-center p-6">
                <item.icon className="h-8 w-8 mx-auto mb-3 text-foreground/50" />
                <p className="text-2xl font-bold text-foreground">{item.title}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-white leading-tight mb-4">Наши направления</h2>
            <ul className="space-y-3 text-white/75 leading-relaxed">
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
                <span><strong className="text-white">Обработка и утилизация РТИ</strong> — сбор, транспортирование, обработка и утилизация автомобильных шин, покрышек, камер и других резинотехнических изделий</span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
                <span><strong className="text-white">Резиновая крошка</strong> — производство гранулята различных фракций для покрытий, спортивных площадок и строительства</span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
                <span><strong className="text-white">Резиновая плитка</strong> — безопасные покрытия для детских и спортивных площадок</span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
                <span><strong className="text-white">Бесшовные покрытия</strong> — монолитные резиновые покрытия для различных назначений</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust / License block */}
      <section className="section-alt section-padding">
        <div className="section-container max-w-4xl">
          <Card>
            <CardContent className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-7 w-7 shrink-0 text-primary mt-0.5" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug mb-2">Надёжный партнёр по утилизации РТИ</h2>
                  <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl">
                    ООО «НЗ ППРТИ» осуществляет деятельность на основании лицензии №Л020-00113-52/00043188 от 16.04.2018 г. и включено в реестр утилизаторов. Предоставляем полный пакет документов для экологической отчётности.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { icon: FileText, text: "Лицензия на утилизацию отходов" },
                  { icon: CheckCircle, text: "Включение в реестр утилизаторов" },
                  { icon: FileText, text: "Предоставление актов утилизации" },
                  { icon: Building2, text: "Работа с юридическими лицами" },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                    <item.icon className="h-4 w-4 shrink-0 text-primary" />
                    {item.text}
                  </span>
                ))}
              </div>

              <Button size="sm" onClick={scrollToForm}>Запросить документы</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
