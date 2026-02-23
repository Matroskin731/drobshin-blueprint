import { Factory, Recycle, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div>
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">О заводе «ДробШин»</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            ООО «Нижегородский завод по переработке РТИ» — надёжный партнёр в переработке шин с 2007 года
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              Наше предприятие специализируется на переработке и утилизации резинотехнических изделий (РТИ), в первую очередь — автомобильных шин. Мы производим качественную резиновую крошку различных фракций, а также готовые покрытия: резиновую плитку и бесшовные покрытия.
            </p>
            <p>
              За более чем 17 лет работы мы наладили полный цикл производства — от приёма сырья до выпуска готовой продукции. Наше оборудование позволяет перерабатывать более 5000 тонн шин в год, внося вклад в экологию региона.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Factory, title: "2007", desc: "Год основания" },
              { icon: Recycle, title: "5000+ т", desc: "Переработки в год" },
              { icon: Award, title: "ГОСТ", desc: "Сертификация" },
              { icon: Users, title: "500+", desc: "Клиентов" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-lg bg-card border">
                <item.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-2xl font-bold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Наши направления</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Переработка и утилизация РТИ</strong> — приём и переработка автомобильных шин и других резинотехнических изделий</span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Резиновая крошка</strong> — производство гранулята различных фракций для покрытий, спортивных площадок и строительства</span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Резиновая плитка</strong> — безопасные покрытия для детских и спортивных площадок</span>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Бесшовные покрытия</strong> — монолитные резиновые покрытия для различных назначений</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
