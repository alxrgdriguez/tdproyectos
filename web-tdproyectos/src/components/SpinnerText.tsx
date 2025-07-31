import React from "react";

const SpinnerPro: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col justify-center items-center h-screen bg-white"
    >
      <svg
        className="w-28 h-28 text-blue-900 drop-shadow-lg"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Animated circle stroke */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="175.84"
          strokeDashoffset="175.84"
          strokeLinecap="round"
          className="animate-spin-stroke"
        />

        {/* Compass center circle */}
        <circle
          cx="32"
          cy="32"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="drop-shadow-md"
        />

        {/* Compass needles */}
        <line
          x1="32"
          y1="32"
          x2="32"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-needle-rotate"
        />
        <line
          x1="32"
          y1="32"
          x2="44"
          y2="44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-needle-rotate"
          style={{ animationDelay: "0.75s" }}
        />
      </svg>
      <p className="mt-6 text-xl font-semibold text-blue-900 tracking-wide animate-fade-in">
        Taller de Proyectos
      </p>

      <style>
        {`@keyframes spinStroke {
          0% {
            stroke-dashoffset: 175.84;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 175.84;
          }
        }
        @keyframes needleRotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(45deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-spin-stroke {
          animation: spinStroke 2.5s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
        .animate-needle-rotate {
          animation: needleRotate 3s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease forwards;
        }
      `}
      </style>
    </div>
  );
};

export default SpinnerPro;
