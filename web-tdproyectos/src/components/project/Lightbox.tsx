import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({
  src,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  src: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
    };

    window.addEventListener("keydown", handleEscape);
    setTimeout(() => setVisible(true), 10);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onNext, onPrev, hasNext, hasPrev]);

  const handleClose = () => {
    setClosing(true);
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // tiempo igual a la duración de la animación
  };

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[999999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 text-white text-3xl rounded-full w-16 h-16 flex items-center justify-center shadow-2xl font-bold z-[1000000]"
        aria-label="Cerrar imagen"
      >
        ✕
      </button>

      {/* Botón de navegación anterior */}
      {onPrev && hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="fixed left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label="Imagen anterior"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      <div
        className={`relative flex items-center justify-center w-full h-full max-w-6xl max-h-full transform transition-transform duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Imagen ampliada"
          className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-300 cursor-zoom-in ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {/* Controles de navegación */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
          <button 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            {isZoomed ? "Reducir" : "Ampliar"}
          </button>
        </div>
      </div>

      {/* Botón de navegación siguiente */}
      {onNext && hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="fixed right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label="Imagen siguiente"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>,
    document.body
  );
}
