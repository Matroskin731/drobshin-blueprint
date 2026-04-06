import { SEO } from "@/components/SEO";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const applications = [
  {
    title: "Детские площадки",
    desc: "Безопасное мягкое покрытие, амортизирующее падения. Продукция соответствует ТУ.",
    items: ["Резиновая плитка 20–50 мм", "Бесшовное покрытие 10–100 мм"],
  },
  {
    title: "Спортивные площадки",
    desc: "Профессиональные покрытия для спортивных объектов.",
    items: ["Резиновая плитка 20–50 мм", "Бесшовное покрытие 10–100 мм"],
  },
  {
    title: "Ландшафтный дизайн",
    desc: "Декоративная цветная крошка для мульчирования и оформления.",
    items: ["Цветная SBR крошка", "Резиновая крошка различных фракций"],
  },
  {
    title: "Дорожное строительство",
    desc: "Добавка крошки в асфальтовые смеси для повышения эластичности.",
    items: ["Мелкая фракция до 0,63 мм", "Крошка 1–2 мм"],
  },
];


const Applications = () => {
  return (
    <div>
      <SEO title="Области применения резиновых покрытий — ДробШин" description="Резиновые покрытия для детских площадок, спортивных объектов, парковок и промышленных зон." />
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Применение продукции</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Где используется резиновая крошка и покрытия
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, i) =>
            <Card key={i}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-foreground leading-tight mb-2">{app.title}</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">{app.desc}</p>
                  <ul className="space-y-1.5">
                    {app.items.map((item, j) =>
                  <li key={j} className="flex items-center gap-2 text-sm text-foreground/80 leading-relaxed">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0 text-lime-500" />
                        {item}
                      </li>
                  )}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>);

};

export default Applications;