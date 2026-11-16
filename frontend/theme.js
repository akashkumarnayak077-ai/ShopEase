// Apply the previously selected theme on every page
function applySavedTheme() {
    const savedTheme = localStorage.getItem("selectedTheme");

    if (!savedTheme) return;

    const theme = JSON.parse(savedTheme);
    const root = document.documentElement;

    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--page-bg", theme.page);
    root.style.setProperty("--surface-color", theme.surface);
    root.style.setProperty("--text-color", theme.text);
    root.style.setProperty("--hero-start", theme.heroStart);
    root.style.setProperty("--hero-end", theme.heroEnd);
    root.style.setProperty("--footer-color", theme.footer);
    root.style.setProperty("--font-family", theme.font);

    const themeName = document.getElementById("themeName");

    if (themeName) {
        themeName.textContent = "Current Theme: " + theme.name;
    }
}

applySavedTheme();