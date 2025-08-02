import { useRef, useState, useEffect } from "react";
import Lightbox from "./Lightbox";

const images = [
  { src: "/images/3d-models/A1.webp", alt: "Casa render 1" },
  { src: "/images/3d-models/B1.webp", alt: "Casa render 2" },
  { src: "/images/3d-models/C1.webp", alt: "Casa render 3" },
  { src: "/images/3d-models/D1.webp", alt: "Casa render 4" },
  { src: "/images/3d-models/1A.webp", alt: "Casa render 5" },
  { src: "/images/3d-models/2A.webp", alt: "Casa render 6" },
];

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const closeLightbox = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLightboxImg(null);
  };

  const openLightbox = (imageSrc: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxImg(imageSrc);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning && !lightboxImg) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isTransitioning, lightboxImg]);

  useEffect(() => {
    if (containerRef.current) {
      const translateX = -(currentIndex * (100 / images.length));
      containerRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      const nextIndex = (currentIndex + 1) % images.length;
      goToSlide(nextIndex);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      goToSlide(prevIndex);
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Controles */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>

        {/* Carrusel */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ width: `${images.length * 100}%` }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / images.length}%` }}
              >
                <div className="relative w-full group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-[540px] object-cover rounded-xl cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={(e) => openLightbox(img.src, e)}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-xl flex items-center justify-center cursor-pointer"
                    onClick={(e) => openLightbox(img.src, e)}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-center transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                      <div className="bg-white/30 backdrop-blur-md rounded-lg px-6 py-3 border border-white/50 shadow-xl">
                        <p className="text-sm mt-1">Click para ver</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-6 gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              disabled={isTransitioning}
              className={`transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 h-3 bg-blue-600 rounded-full"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
              }`}
              aria-label={`Ir a imagen ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {lightboxImg && <Lightbox src={lightboxImg} onClose={closeLightbox} />}
    </>
  );
}
