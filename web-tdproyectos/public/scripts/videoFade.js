document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video[data-fade]");

  videos.forEach((video) => {
    // Inicialmente ocultamos el video
    video.style.opacity = "0";
    video.style.transition = "opacity 0.6s ease-in";

    // Aseguramos que el video está cargado antes de mostrarlo
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA o más
      video.style.opacity = "1";
    } else {
      video.addEventListener("loadeddata", () => {
        video.style.opacity = "1";
      });
    }
  });
});
