const loader = document.querySelector(".site-loader");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let revealObserver;

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

revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
);

const observeReveals = (root = document) => {
  root.querySelectorAll(".reveal, .split-reveal").forEach((element) => {
    if (!element.classList.contains("is-visible")) {
      revealObserver.observe(element);
    }
  });
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getAwardsFromDocument = (sourceDocument) => {
  const awards = [];

  sourceDocument.querySelectorAll(".category-group").forEach((group) => {
    const groupNumber = group.querySelector(".category-group__heading span")?.textContent.trim() || "";
    const groupTitle = group.querySelector(".category-group__heading h2")?.textContent.trim() || "";
    const groupMeta = group.querySelector(".category-group__heading p")?.textContent.trim() || "";
    const groupSlug = group.id || slugify(groupTitle);

    group.querySelectorAll(".category-list li").forEach((item, index) => {
      const title = item.textContent.trim();
      const number = item.value || Number(item.parentElement.getAttribute("start") || 1) + index;

      awards.push({
        title,
        slug: slugify(title),
        number,
        groupNumber,
        groupTitle,
        groupMeta,
        groupSlug
      });
    });
  });

  return awards;
};

const formatAwardUrl = (award) => `award.html?award=${award.slug}`;

const enhanceCategoryDirectory = () => {
  const currentAwards = getAwardsFromDocument(document);

  currentAwards.forEach((award) => {
    const item = [...document.querySelectorAll(".category-list li")].find(
      (candidate) => candidate.textContent.trim() === award.title
    );

    if (!item || item.querySelector("a")) return;

    const link = document.createElement("a");
    link.href = formatAwardUrl(award);
    link.textContent = award.title;
    item.textContent = "";
    item.append(link);
  });
};

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const renderAwardPage = async () => {
  const awardPage = document.querySelector("[data-award-page]");
  if (!awardPage) return;

  try {
    const response = await fetch("awards.html");
    const html = await response.text();
    const sourceDocument = new DOMParser().parseFromString(html, "text/html");
    const awards = getAwardsFromDocument(sourceDocument);
    const requestedSlug = new URLSearchParams(window.location.search).get("award") || awards[0]?.slug;
    const award = awards.find((candidate) => candidate.slug === requestedSlug) || awards[0];

    if (!award) throw new Error("No awards found");

    const sameGroup = awards
      .filter((candidate) => candidate.groupSlug === award.groupSlug && candidate.slug !== award.slug)
      .slice(0, 3);

    document.title = `${award.title} | The AIMEE's`;
    setText("[data-award-group]", `${award.groupTitle} / ${award.groupNumber}`);
    setText("[data-award-title]", award.title);
    setText(
      "[data-award-intro]",
      `AIMEE category ${award.number} is part of The Academy of AI Music framework for recognizing excellence in ${award.title.replace(/^Best /, "").toLowerCase()} across AI-generated and AI-assisted music.`
    );
    setText("[data-award-number]", `Category ${award.number}`);
    setText("[data-award-range]", award.groupMeta);
    setText("[data-award-status]", "2025 nominee fields are ready for the inaugural AIMEE slate.");

    const nomineeList = document.querySelector("[data-award-nominees]");
    if (nomineeList) {
      nomineeList.innerHTML = "";
      ["Nominee 1", "Nominee 2", "Nominee 3", "Nominee 4", "Nominee 5"].forEach((nominee) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${nominee}</strong><span>To be announced</span>`;
        nomineeList.append(item);
      });
    }

    const related = document.querySelector("[data-related-awards]");
    if (related) {
      related.innerHTML = "";
      sameGroup.forEach((relatedAward) => {
        const link = document.createElement("a");
        link.href = formatAwardUrl(relatedAward);
        link.innerHTML = `<span>${String(relatedAward.number).padStart(2, "0")}</span><strong>${relatedAward.title}</strong>`;
        related.append(link);
      });
    }

    observeReveals(awardPage);
  } catch (error) {
    setText("[data-award-title]", "Award category unavailable.");
    setText(
      "[data-award-intro]",
      "The category detail template could not load the awards directory. Please return to the full category list."
    );
  }
};

observeReveals();
enhanceCategoryDirectory();
renderAwardPage();
