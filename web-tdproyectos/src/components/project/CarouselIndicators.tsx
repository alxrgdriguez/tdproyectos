interface CarouselIndicatorsProps {
  totalImages: number;
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
  isTransitioning: boolean;
}

export function CarouselIndicators({
  totalImages,
  currentIndex,
  onIndicatorClick,
  isTransitioning,
}: CarouselIndicatorsProps) {
  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap px-4">
      {Array.from({ length: totalImages }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onIndicatorClick(idx)}
          disabled={isTransitioning}
          className={`transition-all duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            idx === currentIndex
              ? "w-8 h-3 bg-blue-600 rounded-full shadow-md"
              : "w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-110 rounded-full"
          }`}
          aria-label={`Ir a imagen ${idx + 1}`}
          aria-current={idx === currentIndex ? "true" : "false"}
        />
      ))}
    </div>
  );
}
