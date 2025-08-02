interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isTransitioning: boolean;
}

export function CarouselControls({
  onPrev,
  onNext,
  isTransitioning,
}: CarouselControlsProps) {
  return (
    <div className="flex justify-center items-center mb-8 gap-6">
      <button
        onClick={onPrev}
        disabled={isTransitioning}
        className="group relative bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed 
                   text-gray-700 hover:text-blue-600 p-4 rounded-full shadow-md hover:shadow-lg 
                   border border-gray-200 hover:border-blue-300 
                   transition-all duration-300 ease-out transform hover:scale-105 disabled:hover:scale-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Imagen anterior"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5"
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

        {/* Efecto de resplandor en hover */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </button>

      {/* Indicador visual entre botones */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-1 h-1 rounded-full bg-gray-200"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      <button
        onClick={onNext}
        disabled={isTransitioning}
        className="group relative bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed 
                   text-gray-700 hover:text-blue-600 p-4 rounded-full shadow-md hover:shadow-lg 
                   border border-gray-200 hover:border-blue-300 
                   transition-all duration-300 ease-out transform hover:scale-105 disabled:hover:scale-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Imagen siguiente"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        {/* Efecto de resplandor en hover */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </button>
    </div>
  );
}
