import React, { useState, useEffect, useRef } from "react";
import SpinnerText from "./SpinnerText";

let hasLoadedOnce = false;

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

    const minSpinnerTime = 2000;
    const startTime = Date.now();

    const onLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = minSpinnerTime - elapsed;

      timeoutRef.current = window.setTimeout(
        () => {
          setShowSpinner(false);
          setContentVisible(true);
          hasLoadedOnce = true;
        },
        remaining > 0 ? remaining : 0
      );
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
      {showSpinner && <SpinnerText fadeOut={contentVisible} />}
      <div
        aria-busy={showSpinner}
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
