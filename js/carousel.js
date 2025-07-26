let carousel = () => {
  const controls = document.querySelectorAll('[data-carousel-for]');

  controls.forEach(ctrl => {
    const track = document.querySelector(ctrl.getAttribute("data-carousel-for"));
    if (!track) return;

    const previousButton = ctrl.querySelector('button.previous');
    const nextButton = ctrl.querySelector('button.next');
    previousButton.addEventListener("click", () => {
      track.scrollLeft -= 250;
    });
    nextButton.addEventListener("click", () => {
      track.scrollLeft += 250;
    });
  });
};