import React, { useState, useEffect } from "react";

const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Pequeño delay para el fade-in
    const timeout = setTimeout(() => {
      setContentVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 1s ease-in-out",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default LoadingWrapper;
