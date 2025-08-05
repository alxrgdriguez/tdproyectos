import React, { useState, useEffect, useRef } from "react";
import SpinnerText from "./SpinnerText.tsx";

let hasLoadedOnce = false; // variable global simple, OK si no hay SSR

const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showSpinner, setShowSpinner] = useState(!hasLoadedOnce);
  const [contentVisible, setContentVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasLoadedOnce) {
      setShowSpinner(false);
      setContentVisible(true);
      return;
    }

    const minSpinnerTime = 1200;
    const startTime = Date.now();

    const onLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = minSpinnerTime - elapsed;

      if (remaining > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setShowSpinner(false);
          setContentVisible(true);
          hasLoadedOnce = true;
        }, remaining);
      } else {
        setShowSpinner(false);
        setContentVisible(true);
        hasLoadedOnce = true;
      }
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSpinner ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSpinner]);

  return (
    <>
      {showSpinner && <SpinnerText />}
      <div
        aria-busy={showSpinner}
        data-loaded={contentVisible}
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.4s ease-in-out", // un poco más lenta para suavizar
          minHeight: "100vh",
          backgroundColor: "transparent", // sin fondo explícito
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;
