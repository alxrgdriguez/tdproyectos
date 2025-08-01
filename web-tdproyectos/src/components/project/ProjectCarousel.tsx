import { useRef, useState, useEffect } from "react";

const images = [
  { src: "/images/3d-models/A1.webp", alt: "Casa render 1" },
  { src: "/images/3d-models/B1.webp", alt: "Casa render 2" },
  { src: "/images/3d-models/C1.webp", alt: "Casa render 2" },
  { src: "/images/3d-models/D1.webp", alt: "Casa render 3" },
  { src: "/images/3d-models/1A.webp", alt: "Casa render 4" },
  { src: "/images/3d-models/2A.webp", alt: "Casa render 5" },
];

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Auto-scroll cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, offsetWidth, scrollWidth } = containerRef.current;

        // Si está al final, volver al inicio
        if (scrollLeft + offsetWidth >= scrollWidth) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          containerRef.current.scrollBy({
            left: offsetWidth,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Difuminar la web al abrir el lightbox
  useEffect(() => {
    if (lightboxImg) {
      document.body.classList.add("blurred");
    } else {
      document.body.classList.remove("blurred");
    }

    return () => document.body.classList.remove("blurred");
  }, [lightboxImg]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carrusel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-6 px-2"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 transform hover:scale-[1.02] transition duration-300"
          >
            <img
              src={img.src}
              alt={img.alt}
              onClick={() => setLightboxImg(img.src)}
              className="w-full h-[400px] object-cover rounded-xl shadow-xl cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-5 right-5 text-4xl text-white hover:scale-110 transition"
            aria-label="Cerrar"
          >
            ✕
          </button>
          <img
            src={lightboxImg}
            alt="Imagen ampliada"
            className="max-w-[95%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
