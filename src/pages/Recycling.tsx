import { Recycle, Truck, Factory, Leaf } from "lucide-react";
import { RequestForm } from "@/components/RequestForm";

const Recycling = () => {
  return (
    <div>
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Переработка РТИ</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Принимаем на переработку автомобильные шины и резинотехнические изделия
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <div className="space-y-6 text-muted-foreground mb-12">
            <p>
              Завод «ДробШин» осуществляет приём и переработку изношенных автомобильных шин и других резинотехнических изделий. Мы предлагаем экологичное решение проблемы утилизации РТИ.
            </p>
            <p>
              Принимаем шины от предприятий, автопарков, шиномонтажных мастерских и частных лиц. Выдаём все необходимые документы для отчётности.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Recycle, title: "Приём шин", desc: "Принимаем легковые и грузовые шины любого размера" },
              { icon: Factory, title: "Полный цикл", desc: "Переработка на собственном оборудовании" },
              { icon: Leaf, title: "Экологичность", desc: "Безотходная технология переработки" },
              { icon: Truck, title: "Самовывоз", desc: "Возможен вывоз шин с вашей территории" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg border bg-card">
                <item.icon className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <RequestForm source="переработка РТИ" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recycling;
