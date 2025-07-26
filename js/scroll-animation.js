let scrollAnimation = () => {
  const scrollElements = document.querySelectorAll("[data-scroll-animatable]");
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  const heroSection = document.querySelector("[data-scroll-pass-hero]");

  function handleScrollAnimations() {
    scrollElements.forEach((el) => {
      const [offsetAmountStr, passAmountStr] = el.getAttribute("data-scroll-animatable").split(" ");

      const offsetAmount = parseFloat(offsetAmountStr);
      const passAmount = parseFloat(passAmountStr);

      const rect = el.getBoundingClientRect();
      if ((rect.top + el.offsetHeight*offsetAmount) < window.innerHeight) {
        el.classList.add("scroll-manager-scrolled-to");
      } else {
        el.classList.remove("scroll-manager-scrolled-to");
      }
      if (passAmount != null && passAmount !== 0) {
        if ((rect.top + el.offsetHeight*passAmount) < window.innerHeight) {
            el.classList.add("scroll-manager-scrolled-pass");
        } else {
            el.classList.remove("scroll-manager-scrolled-pass");
        }
      }
    });
  }

  function handleScrollPassHero() {
    let heroSectionRect = heroSection.getBoundingClientRect();
    if (heroSection.offsetHeight + heroSectionRect.top < 0) {
      document.body.classList.add("scroll-manager-scrolled-pass-hero");
    } else {
      document.body.classList.remove("scroll-manager-scrolled-pass-hero");
    }
  }

  let containerOffsets = [];

  const cacheContainerOffsets = () => {
    containerOffsets = Array.from(parallaxElements).map(el => {
      const [multiplierStr, selector] = el.getAttribute("data-parallax").split(" ");
      const multiplier = parseFloat(multiplierStr);
      const container = document.querySelector(selector);
      if (!container) return null;
      return { el, container, multiplier };
    });
  };

  const handleParallaxEffects = () => {
    const scrollY = window.scrollY;
    const winHeight = window.innerHeight;

    containerOffsets.forEach(({ el, container, multiplier }) => {
      const containerRect = container.getBoundingClientRect();

      // When container is in view
      if (containerRect.top < winHeight && containerRect.bottom > 0) {
        const delta = scrollY - container.offsetTop;
        const translateY = delta * multiplier;
        el.style.translate = `0 ${-translateY}px`;
      }
    });
  };
  

  function updateOnScroll() {
    handleScrollAnimations();
    handleParallaxEffects();
    handleScrollPassHero();
  }

  function updateOnResize() {
    handleScrollAnimations();
    handleParallaxEffects();
    handleScrollPassHero();
  }

  window.addEventListener("scroll", updateOnScroll);
  window.addEventListener("resize", updateOnResize);

  cacheContainerOffsets();
  updateOnScroll();
}
