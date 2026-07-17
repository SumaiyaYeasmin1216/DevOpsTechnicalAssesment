const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-nav");
const navigationLinks = document.querySelectorAll(".primary-nav a");
const currentYear = document.querySelector("#current-year");

const closeNavigation = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  primaryNavigation.classList.remove("is-open");
};

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNavigation.classList.toggle("is-open", !isExpanded);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeNavigation();
  }
});

currentYear.textContent = String(new Date().getFullYear());
