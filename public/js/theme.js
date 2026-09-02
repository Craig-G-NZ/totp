(function () {
  var STORAGE_KEY = "totp-theme";

  var THEME_COLORS = {
    light: "#e8eef4",
    dark: "#0b1220",
  };

  function getStoredTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch {
      // localStorage may be blocked (private browsing, strict privacy settings).
      // Caller falls back to the system color scheme via resolveTheme().
      return null;
    }
    return null;
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function resolveTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    var next = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = next;

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = THEME_COLORS[next];
    }

    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      var toDark = next === "light";
      toggle.setAttribute(
        "aria-label",
        toDark ? "Switch to dark mode" : "Switch to light mode"
      );
      toggle.setAttribute("title", toDark ? "Dark mode" : "Light mode");
      toggle.setAttribute("aria-pressed", String(!toDark));
    }
  }

  function setTheme(theme) {
    var next = theme === "dark" ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (err) {
      /* Theme still applies for this session; storage may be blocked. */
    }
    applyTheme(next);
  }

  function toggleTheme() {
    var current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  }

  function bindThemeToggle() {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle || toggle.dataset.themeBound === "1") {
      return;
    }
    toggle.dataset.themeBound = "1";
    toggle.addEventListener("click", toggleTheme);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(resolveTheme());
    bindThemeToggle();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (getStoredTheme()) return;
    applyTheme(e.matches ? "dark" : "light");
  });
})();
