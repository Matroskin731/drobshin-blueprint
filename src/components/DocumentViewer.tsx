import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type DocType = "image" | "pdf" | "docx";

export interface DocumentData {
  title: string;
  type: DocType;
  /** For image docs — array of image URLs (slider). For pdf — single URL. For docx — single URL. */
  sources: string[];
  href: string;
}

interface Props {
  doc: DocumentData | null;
  onClose: () => void;
}

export const DocumentViewer = ({ doc, onClose }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (doc) {
      setCurrentPage(0);
      // trigger enter animation
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [doc]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  // close on Escape
  useEffect(() => {
    if (!doc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [doc, handleClose]);

  // close on backdrop click
  const handleBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose],
  );

  if (!doc) return null;

  const totalPages = doc.sources.length;
  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "hsla(210, 18%, 5%, 0.92)" }}
      onClick={handleBackdrop}
    >
      {/* Content wrapper */}
      <div
        className={`relative flex flex-col items-center max-w-4xl w-full mx-4 transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 px-1">
          <h3 className="text-white font-bold text-lg truncate pr-4">{doc.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
            >
              <a href={doc.href} target="_blank" rel="noopener noreferrer" download>
                <ExternalLink className="h-4 w-4 mr-1.5" />
                Скачать документ
              </a>
            </Button>
            <button
              onClick={handleClose}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Document area */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            boxShadow: "0 0 60px 10px hsla(123, 46%, 34%, 0.08), 0 25px 60px -15px hsla(0, 0%, 0%, 0.5)",
          }}
        >
          {doc.type === "image" && (
            <div className="relative bg-[#0B0F14] flex items-center justify-center min-h-[60vh] max-h-[80vh]">
              <img
                src={doc.sources[currentPage]}
                alt={`${doc.title} — страница ${currentPage + 1}`}
                className="max-h-[80vh] w-auto max-w-full object-contain select-none"
                draggable={false}
              />

              {/* Slider arrows */}
              {totalPages > 1 && (
                <>
                  <button
                    onClick={() => canPrev && setCurrentPage((p) => p - 1)}
                    disabled={!canPrev}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                      canPrev
                        ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                        : "bg-white/5 text-white/20 cursor-default"
                    }`}
                    aria-label="Предыдущая страница"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => canNext && setCurrentPage((p) => p + 1)}
                    disabled={!canNext}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                      canNext
                        ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                        : "bg-white/5 text-white/20 cursor-default"
                    }`}
                    aria-label="Следующая страница"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Page indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                    {doc.sources.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentPage ? "w-5 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Страница ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {doc.type === "pdf" && (
            <div className="bg-[#0B0F14] min-h-[60vh] max-h-[80vh]">
              <iframe
                src={doc.sources[0]}
                title={doc.title}
                className="w-full h-[80vh] border-0"
              />
            </div>
          )}

          {doc.type === "docx" && (
            <div className="bg-[#0B0F14] flex flex-col items-center justify-center min-h-[40vh] gap-4">
              <FileText className="h-16 w-16 text-white/30" />
              <p className="text-white/50 text-sm max-w-xs text-center">
                Предпросмотр недоступен для формата DOCX.
                <br />
                Скачайте файл для просмотра.
              </p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
              >
                <a href={doc.href} download>
                  Скачать документ
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
