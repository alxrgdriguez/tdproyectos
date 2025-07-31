import React, { useState, useEffect } from "react";
import SpinnerText from "./SpinnerText";

let hasLoadedOnce = false; // variable global para controlar si ya se mostró el spinner

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

    const minSpinnerTime = 2000; // 2 seconds
    let startTime = Date.now();

    const onLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = minSpinnerTime - elapsed;
      if (remaining > 0) {
        setTimeout(() => {
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
  }, []);

  // Controlar scroll del body
  useEffect(() => {
    if (showSpinner) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpiar al desmontar
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSpinner]);

  return (
    <>
      {showSpinner && <SpinnerText />}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;
