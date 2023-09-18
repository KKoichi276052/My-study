// -------- Declaration --------
const themeToggleBtn = document.querySelector("#theme-toggle");
const themeToggleDarkIcon = document.querySelector("#theme-toggle-dark-icon");
const themeToggleLightIcon = document.querySelector("#theme-toggle-light-icon");

// Show icon matches to theme
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleDarkIcon.classList.remove("hidden");
} else {
  themeToggleLightIcon.classList.remove("hidden");
}

// -------- Functions --------

// Toggle Mode
function toggleMode() {
  // Toggle icon
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // Toggle theme
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
}

// Event Listener
themeToggleBtn.addEventListener("click", toggleMode);
