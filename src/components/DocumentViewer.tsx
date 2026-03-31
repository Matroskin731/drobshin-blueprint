import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type DocType = "image" | "pdf" | "docx";

export interface DocumentData {
  title: string;
  type: DocType;
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
      requestAnimationFrame(() => setVisible(true));
      // Prevent body scroll on mobile
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [doc]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    if (!doc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [doc, handleClose]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose],
  );

  // Touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || !doc || doc.sources.length <= 1) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < doc.sources.length - 1) {
        setCurrentPage((p) => p + 1);
      } else if (diff < 0 && currentPage > 0) {
        setCurrentPage((p) => p - 1);
      }
    }
    setTouchStart(null);
  };

  if (!doc) return null;

  const totalPages = doc.sources.length;
  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "hsla(210, 18%, 5%, 0.95)" }}
      onClick={handleBackdrop}
    >
      <div
        className={`relative flex flex-col items-center w-full max-w-4xl max-h-full transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-3 px-1 shrink-0">
          <h3 className="text-white font-bold text-sm sm:text-lg truncate pr-2">{doc.title}</h3>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-white/15 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 text-xs sm:text-sm px-2 sm:px-3"
            >
              <a href={doc.href} target="_blank" rel="noopener noreferrer" download>
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Скачать документ</span>
                <span className="sm:hidden">Скачать</span>
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
          className="relative w-full rounded-xl overflow-hidden flex-1 min-h-0"
          style={{
            boxShadow: "0 0 60px 10px hsla(123, 46%, 34%, 0.08), 0 25px 60px -15px hsla(0, 0%, 0%, 0.5)",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {doc.type === "image" && (
            <div className="relative bg-[#0B0F14] flex items-center justify-center h-[60vh] sm:h-[70vh] max-h-[80vh]">
              <img
                src={doc.sources[currentPage]}
                alt={`${doc.title} — страница ${currentPage + 1}`}
                className="max-h-full w-auto max-w-full object-contain select-none"
                draggable={false}
              />

              {totalPages > 1 && (
                <>
                  {/* Left arrow - hidden on mobile (use swipe) */}
                  <button
                    onClick={() => canPrev && setCurrentPage((p) => p - 1)}
                    disabled={!canPrev}
                    className={`hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full items-center justify-center transition-all ${
                      canPrev
                        ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                        : "bg-white/5 text-white/20 cursor-default"
                    }`}
                    aria-label="Предыдущая страница"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {/* Right arrow - hidden on mobile */}
                  <button
                    onClick={() => canNext && setCurrentPage((p) => p + 1)}
                    disabled={!canNext}
                    className={`hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full items-center justify-center transition-all ${
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
                    <span className="text-[10px] text-white/50 ml-1.5 sm:hidden">
                      {currentPage + 1}/{totalPages}
                    </span>
                  </div>

                  {/* Swipe hint on mobile */}
                  <div className="sm:hidden absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] text-white/50">
                    Свайп для переключения
                  </div>
                </>
              )}
            </div>
          )}

          {doc.type === "pdf" && (
            <div className="bg-[#0B0F14] h-[60vh] sm:h-[70vh] max-h-[80vh]">
              <iframe
                src={doc.sources[0]}
                title={doc.title}
                className="w-full h-full border-0"
              />
            </div>
          )}

          {doc.type === "docx" && (
            <div className="bg-[#0B0F14] flex flex-col items-center justify-center min-h-[40vh] gap-4 p-6">
              <FileText className="h-16 w-16 text-white/40" />
              <p className="text-white/60 text-sm max-w-xs text-center">
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
