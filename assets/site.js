const loader = document.querySelector(".site-loader");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const glow = document.querySelector(".cursor-glow");
const heroSignal = document.querySelector(".hero-signal");
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
  const waveState = {
    targetX: 0,
    targetY: 0,
    targetIntensity: 0,
    x: 0,
    y: 0,
    intensity: 0,
  };

  const moveWave = (event) => {
    if (glow) {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }

    if (heroSignal) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      const intensity = Math.min(1, Math.hypot(x, y) * 1.8);

      waveState.targetX = x;
      waveState.targetY = y;
      waveState.targetIntensity = intensity;
    }
  };

  window.addEventListener("pointermove", moveWave);
  window.addEventListener("mousemove", moveWave);

  const animateWave = () => {
    if (heroSignal) {
      waveState.x += (waveState.targetX - waveState.x) * 0.12;
      waveState.y += (waveState.targetY - waveState.y) * 0.12;
      waveState.intensity += (waveState.targetIntensity - waveState.intensity) * 0.12;

      heroSignal.style.setProperty("--wave-x", `${waveState.x * 34}px`);
      heroSignal.style.setProperty("--wave-y", `${waveState.y * 22}px`);
      heroSignal.style.setProperty("--wave-tilt", `${waveState.x * 3.2}deg`);
      heroSignal.style.setProperty("--wave-scale", `${1 + waveState.intensity * 0.035}`);
      heroSignal.style.setProperty("--wave-opacity", waveState.intensity.toFixed(3));
      heroSignal.style.setProperty("--wave-scroll", `${window.scrollY * 0.08}px`);
    }

    window.requestAnimationFrame(animateWave);
  };

  animateWave();

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
