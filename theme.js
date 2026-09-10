// Apply the saved preference before rendering to avoid a flash of the wrong theme.
(() => {
  let theme;
  try { theme = localStorage.getItem("obraTrackTheme"); } catch { /* Use system preference. */ }
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
})();
