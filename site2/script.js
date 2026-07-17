const rootElement = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const currentYear = document.querySelector("#current-year");
const savedTheme = window.localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const applyTheme = (theme) => {
  rootElement.dataset.theme = theme;
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );
};

applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  window.localStorage.setItem("portfolio-theme", nextTheme);
});

currentYear.textContent = String(new Date().getFullYear());
