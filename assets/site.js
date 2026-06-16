const loader = document.querySelector(".site-loader");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const glow = document.querySelector(".cursor-glow");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), reduceMotion ? 0 : 900);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
);

document.querySelectorAll(".reveal, .split-reveal").forEach((element) => {
  observer.observe(element);
});

if (!reduceMotion) {
  const moveWave = (event) => {
    if (glow) {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }
  };

  window.addEventListener("pointermove", moveWave);
  window.addEventListener("mousemove", moveWave);

  const parallaxElements = document.querySelectorAll(".quote-panel__glow, .enter__orb");

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach((element, index) => {
        const speed = index === 0 ? 0.035 : 0.05;
        element.style.translate = `0 ${scrollY * speed}px`;
      });
    },
    { passive: true }
  );
}
