(function () {
  var STORAGE_KEY = "totp-theme";

  function getStoredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function themeColor(theme) {
    return theme === "dark" ? "#020617" : "#0b1220";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = themeColor(theme);
    }
    updateToggle(theme);
  }

  function updateToggle(theme) {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;

    var isDark = theme === "dark";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    btn.title = isDark ? "Light mode" : "Dark mode";
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  window.TotpTheme = {
    get: getTheme,
    set: setTheme,
    apply: applyTheme,
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getTheme());

    var btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (getStoredTheme()) return;
      applyTheme(e.matches ? "dark" : "light");
    });
})();
