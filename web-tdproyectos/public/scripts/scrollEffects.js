// Vuelve al top al recargar
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// Animación cuando los elementos entran al viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Solo animar 1 vez
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Esperar que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });
});
