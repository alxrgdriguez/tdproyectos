import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEscape);
    setTimeout(() => setVisible(true), 10);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

      <div
        className={`relative flex items-center justify-center w-full h-full max-w-6xl max-h-full transform transition-transform duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Imagen ampliada"
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
        />
      </div>
    </div>,
    document.body
  );
}
