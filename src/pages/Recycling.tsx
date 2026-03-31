import { SEO } from "@/components/SEO";
import { Recycle, Truck, Factory, Leaf } from "lucide-react";
import { RequestForm } from "@/components/RequestForm";

const Recycling = () => {
  return (
    <div>
      <SEO title="Утилизация отходов РТИ — ДробШин" description="Сбор, транспортирование и утилизация автомобильных шин и резинотехнических изделий. Лицензия, акты утилизации." />
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Утилизация отходов РТИ</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Принимаем на утилизацию автомобильные шины и резинотехнические изделия
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <div className="space-y-6 text-foreground/80 leading-relaxed mb-12">
            <p>
              Завод «ДробШин» осуществляет приём и утилизацию изношенных автомобильных шин и других резинотехнических изделий. Мы предлагаем экологичное решение проблемы утилизации РТИ.
            </p>
            <p>
              Принимаем шины от предприятий, автопарков, шиномонтажных мастерских и частных лиц. Выдаём все необходимые документы для отчётности.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Recycle, title: "Приём шин", desc: "Принимаем легковые и грузовые шины любого размера" },
              { icon: Factory, title: "Полный цикл", desc: "Утилизация на собственном оборудовании" },
              { icon: Leaf, title: "Экологичность", desc: "Безотходная технология утилизации" },
              { icon: Truck, title: "Самовывоз", desc: "Возможен вывоз шин с вашей территории" },
            ].map((item, i) => (
              <div key={i} className="unified-card flex gap-4 p-6">
                <item.icon className="h-8 w-8 text-foreground/50 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <RequestForm source="утилизация РТИ" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recycling;
