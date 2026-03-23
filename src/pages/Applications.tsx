import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const applications = [
{
  title: "Детские площадки",
  desc: "Безопасное мягкое покрытие, амортизирующее падения. Соответствует ТУ.",
  items: ["Резиновая плитка 30–50 мм", "Бесшовное покрытие 20–40 мм"]
},
{
  title: "Спортивные площадки",
  desc: "Профессиональные покрытия для спортивных объектов и тренажёрных залов.",
  items: ["Резиновая плитка 20–40 мм", "Бесшовное покрытие 10–20 мм"]
},
{
  title: "Придомовые территории",
  desc: "Дорожки, террасы и зоны отдыха с нескользящим покрытием.",
  items: ["Резиновая плитка 20 мм", "Бесшовное покрытие 10 мм"]
},
{
  title: "Промышленные объекты",
  desc: "Покрытия для складов, гаражей и производственных помещений.",
  items: ["Резиновая плитка 40–50 мм", "Крошка для подсыпки"]
},
{
  title: "Ландшафтный дизайн",
  desc: "Декоративная цветная крошка для мульчирования и оформления.",
  items: ["Цветная SBR крошка", "Мелкая фракция до 0,63 мм"]
},
{
  title: "Дорожное строительство",
  desc: "Добавка крошки в асфальтовые смеси для повышения эластичности.",
  items: ["Крошка 1–2 мм", "Крошка 2–4 мм"]
}];


const Applications = () => {
  return (
    <div>
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Применение продукции</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
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
                  <h3 className="text-lg font-bold mb-2">{app.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{app.desc}</p>
                  <ul className="space-y-1.5">
                    {app.items.map((item, j) =>
                  <li key={j} className="flex items-center gap-2 text-sm">
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