import { useRef, useState, useEffect } from "react";
import Lightbox from "./Lightbox";
import { CarouselImage } from "./CarouselImage";
import { CarouselIndicators } from "./CarouselIndicators";

const images = [
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/A1.webp?updatedAt=1754215930365",
    alt: "Casa render 1",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/B1.webp?updatedAt=1754215932573",
    alt: "Casa render 2",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/C1.webp?updatedAt=1754215932720",
    alt: "Casa render 3",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/D1.webp?updatedAt=1754215932707",
    alt: "Casa render 4",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/1A.webp?updatedAt=1754215929724",
    alt: "Casa render 5",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/2A.webp?updatedAt=1754215929705",
    alt: "Casa render 6",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/2A_2.webp?updatedAt=1754215929829",
    alt: "Casa render 7",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/3A.webp?updatedAt=1754215929903",
    alt: "Casa render 8",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/4A.webp?updatedAt=1754215930184",
    alt: "Casa render 9",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/5A.webp?updatedAt=1754215930131",
    alt: "Casa render 10",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/6A.webp?updatedAt=1754215930113",
    alt: "Casa render 11",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/7A.webp?updatedAt=1754215929845",
    alt: "Casa render 12",
  },
  {
    src: "https://ik.imagekit.io/proyectostd/images/3d-models/8A.webp?updatedAt=1754215929945",
    alt: "Casa render 13",
  },
];

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Mínima distancia requerida para un swipe (en px)
  const minSwipeDistance = 50;

  const closeLightbox = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLightboxImg(null);
  };

  const openLightbox = (imageSrc: string) => {
    setLightboxImg(imageSrc);
  };

  // Autoplay con pausa
  useEffect(() => {
    if (isPaused || isTransitioning || lightboxImg) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning, lightboxImg, isPaused, images.length]);

  // Actualizar posición del carrusel
  useEffect(() => {
    if (containerRef.current) {
      const translateX = -(currentIndex * (100 / images.length));
      containerRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex]);

  // Soporte para navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImg) return; // No navegar si el lightbox está abierto

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning]);

  // Pausar autoplay cuando el usuario interactúa
  const handleUserInteraction = () => {
    setIsPaused(true);
    // Reanudar después de 10 segundos de inactividad
    setTimeout(() => setIsPaused(false), 10000);
  };

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

  // Manejadores de eventos mejorados
  const enhancedPrevSlide = () => {
    handleUserInteraction();
    prevSlide();
  };

  const enhancedNextSlide = () => {
    handleUserInteraction();
    nextSlide();
  };

  const enhancedGoToSlide = (index: number) => {
    handleUserInteraction();
    goToSlide(index);
  };

  // Manejadores de eventos táctiles
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && !isTransitioning) {
      nextSlide();
    } else if (isRightSwipe && !isTransitioning) {
      prevSlide();
    }
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 relative">
        {/* Carrusel */}
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={handleUserInteraction}
        >
          {/* Flechas laterales dentro del carrusel */}
          <button
            onClick={enhancedPrevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
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

          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ width: `${images.length * 100}%` }}
          >
            {images.map((img, idx) => (
              <CarouselImage
                key={idx}
                image={img}
                onClick={(src) => setLightboxImg(src)}
                width={`${100 / images.length}%`}
              />
            ))}
          </div>

          <button
            onClick={enhancedNextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Imagen siguiente"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <CarouselIndicators
          totalImages={images.length}
          currentIndex={currentIndex}
          onIndicatorClick={enhancedGoToSlide}
          isTransitioning={isTransitioning}
        />
      </div>

      {lightboxImg && <Lightbox src={lightboxImg} onClose={closeLightbox} />}
    </>
  );
}
