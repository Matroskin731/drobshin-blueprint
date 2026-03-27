import { useState } from "react";
import { FileCheck, Shield, ClipboardCheck, FileText } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { DocumentViewer, type DocumentData } from "@/components/DocumentViewer";

interface DocCard {
  icon: typeof FileCheck;
  title: string;
  desc: string;
  btn: string;
  /** Main link for "open in new tab" */
  href: string;
  /** Thumbnail shown on card */
  thumb: string | null;
  /** Viewer data */
  viewer: DocumentData;
}

const documents: DocCard[] = [
  {
    icon: FileCheck,
    title: "Лицензия на обращение с отходами",
    desc: "Разрешение на сбор, транспортировку, обработку и утилизацию отходов I–IV класса опасности",
    btn: "Открыть лицензию",
    href: "/documents/license-main.jpg",
    thumb: "/documents/license-main.jpg",
    viewer: {
      title: "Лицензия на обращение с отходами",
      type: "image",
      sources: [
        "/documents/license-main.jpg",
        "/documents/license-back.jpg",
      ],
      href: "/documents/license-main.jpg",
    },
  },
  {
    icon: Shield,
    title: "Приложение к лицензии",
    desc: "Перечень отходов и виды работ, выполняемых в составе лицензируемого вида деятельности",
    btn: "Открыть приложение",
    href: "/documents/license-attachment.jpg",
    thumb: "/documents/license-attachment.jpg",
    viewer: {
      title: "Приложение к лицензии",
      type: "image",
      sources: [
        "/documents/license-attachment.jpg",
        "/documents/license-attachment-2.jpg",
      ],
      href: "/documents/license-attachment.jpg",
    },
  },
  {
    icon: Shield,
    title: "Сертификат на резиновую крошку",
    desc: "Подтверждение качества продукции и соответствия нормативам",
    btn: "Смотреть сертификат",
    href: "/documents/sertifikat-rti.pdf",
    thumb: "/documents/sertifikat-preview.jpg",
    viewer: {
      title: "Сертификат на резиновую крошку",
      type: "image",
      sources: ["/documents/sertifikat-preview.jpg"],
      href: "/documents/sertifikat-rti.pdf",
    },
  },
  {
    icon: ClipboardCheck,
    title: "Правила приёмки шин",
    desc: "Требования к принимаемому сырью (шины, покрышки, камеры)",
    btn: "Ознакомиться",
    href: "/documents/rules-acceptance.docx",
    thumb: "/documents/rules-preview.jpg",
    viewer: {
      title: "Правила приёмки шин",
      type: "image",
      sources: ["/documents/rules-preview.jpg"],
      href: "/documents/rules-acceptance.docx",
    },
  },
];

export const DocumentsSection = () => {
  const sectionRef = useScrollReveal();
  const stagger = useStaggerReveal(documents.length, 100, 80);
  const [activeDoc, setActiveDoc] = useState<DocumentData | null>(null);

  return (
    <>
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
              <button
                key={i}
                ref={stagger(i)}
                type="button"
                onClick={() => setActiveDoc(doc.viewer)}
                className="trust-stat-card flex flex-col items-center text-center p-5 cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:border-primary/30"
                style={{
                  transitionProperty: "transform, box-shadow, border-color",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px 2px hsla(123, 46%, 34%, 0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Thumbnail preview */}
                <div className="w-full h-28 rounded-lg mb-4 overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                  {doc.thumb ? (
                    <img
                      src={doc.thumb}
                      alt={doc.title}
                      className="h-full w-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : doc.viewer.type === "pdf" ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <FileCheck className="h-8 w-8 text-primary/60 group-hover:text-primary transition-colors" />
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">PDF</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <FileText className="h-8 w-8 text-white/30 group-hover:text-white/50 transition-colors" />
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">DOCX</span>
                    </div>
                  )}
                </div>

                <div className="mb-3 h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <doc.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm leading-tight">{doc.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">{doc.desc}</p>
                <span className="text-xs text-primary/80 group-hover:text-primary transition-colors font-medium">
                  {doc.btn} →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DocumentViewer doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </>
  );
};
