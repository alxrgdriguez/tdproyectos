interface ImageData {
  src: string;
  alt: string;
}

interface CarouselImageProps {
  image: ImageData;
  onClick: (src: string) => void;
  width: string;
}

export function CarouselImage({ image, onClick, width }: CarouselImageProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
  };

  return (
    <div className="flex-shrink-0 px-2" style={{ width }}>
      <div className="relative w-full group cursor-pointer">
        <img
          src={image.src}
          alt={image.alt}
          onClick={() => onClick(image.src)}
          className="w-full h-[400px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={handleImageError}
        />

        {/* Overlay con click también */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-xl flex items-center justify-center cursor-pointer"
          onClick={() => onClick(image.src)}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-center transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
            <div className="bg-white/30 backdrop-blur-md rounded-lg px-6 py-3 border border-white/50 shadow-xl">
              <p className="text-sm mt-1 opacity-90">Click para abrir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
