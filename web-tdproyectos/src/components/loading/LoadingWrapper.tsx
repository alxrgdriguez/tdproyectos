import React, { useState, useEffect } from "react";
import SpinnerText from "./SpinnerText";

let hasLoadedOnce = false;

const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showSpinner, setShowSpinner] = useState(!hasLoadedOnce);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (hasLoadedOnce) {
      setShowSpinner(false);
      setContentVisible(true);
      return;
    }

    const minSpinnerTime = 2000;
    const startTime = Date.now();

    const onLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = minSpinnerTime - elapsed;

      setTimeout(
        () => {
          setShowSpinner(false);
          setContentVisible(true);
          hasLoadedOnce = true;
        },
        Math.max(0, remaining)
      );
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  // Deshabilita scroll si se muestra el spinner
  useEffect(() => {
    if (showSpinner) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSpinner]);

  return (
    <div style={{ position: "relative" }}>
      {/* Spinner superpuesto */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: showSpinner ? "auto" : "none",
          opacity: showSpinner ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          backgroundColor: "#fff",
        }}
        aria-hidden={!showSpinner}
      >
        <SpinnerText />
      </div>

      {/* Contenido de la web (visible desde el principio, pero con fade-in) */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LoadingWrapper;
