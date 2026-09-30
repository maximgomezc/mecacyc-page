  const gallery = document.querySelector("[data-carousel]");

  if (gallery) {
    const viewport = gallery.querySelector("[data-viewport]");
    const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
    const dots = Array.from(gallery.querySelectorAll("[data-slide-to]"));
    const indexLabel = gallery.querySelector("[data-index]");
    let currentIndex = 0;

    const goToSlide = (index) => {
      const nextIndex = (index + slides.length) % slides.length;
      setCurrentSlide(nextIndex);
      viewport.scrollTo({
        left: nextIndex * viewport.clientWidth,
        behavior: "smooth"
      });
    };

    const setCurrentSlide = (index) => {
      currentIndex = index;
      indexLabel.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

      slides.forEach((slide, index) => {
        slide.setAttribute("aria-hidden", String(index !== currentIndex));
      });

      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    const updateControls = () => {
      const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
      if (index !== currentIndex) setCurrentSlide(index);
    };

    gallery.querySelector("[data-prev]").addEventListener("click", () => goToSlide(currentIndex - 1));
    gallery.querySelector("[data-next]").addEventListener("click", () => goToSlide(currentIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => goToSlide(index)));
    viewport.addEventListener("scroll", updateControls, { passive: true });
    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });
  }