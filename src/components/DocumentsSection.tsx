import { FileCheck, Shield, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const documents = [
  {
    icon: FileCheck,
    title: "Лицензия на обращение с отходами",
    desc: "Разрешение на сбор, транспортировку, обработку и утилизацию отходов I–IV класса опасности",
    btn: "Открыть лицензию",
    href: "/documents/license-main.jpg",
  },
  {
    icon: Shield,
    title: "Приложение к лицензии",
    desc: "Перечень отходов и виды работ, выполняемых в составе лицензируемого вида деятельности",
    btn: "Открыть приложение",
    href: "/documents/license-attachment.jpg",
  },
  {
    icon: Shield,
    title: "Сертификат на резиновую крошку",
    desc: "Подтверждение качества продукции и соответствия нормативам",
    btn: "Смотреть сертификат",
    href: "/documents/sertifikat-rti.pdf",
  },
  {
    icon: ClipboardCheck,
    title: "Правила приёмки шин",
    desc: "Требования к принимаемому сырью (шины, покрышки, камеры)",
    btn: "Ознакомиться",
    href: "/documents/rules-acceptance.docx",
  },
];

export const DocumentsSection = () => {
  const sectionRef = useScrollReveal();
  const stagger = useStaggerReveal(documents.length, 100, 80);

  return (
    <section className="section-padding section-dark" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-white">Документы и лицензии</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Работаем официально. Все разрешения, лицензии и сертификаты подтверждены.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {documents.map((doc, i) => (
            <div
              key={i}
              ref={stagger(i)}
              className="trust-stat-card flex flex-col items-center text-center p-7"
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <doc.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-2">{doc.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">{doc.desc}</p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/30"
              >
                <a href={doc.href} target="_blank" rel="noopener noreferrer">
                  {doc.btn}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
