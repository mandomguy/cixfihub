/**
 * ==========================================================================
 *    PORTABLE NAVBAR COMPONENT
 *    ==========================================================================
 *
 * Drop-in navbar for any page. Just include this script and call:
 *   renderNavbar({ searchId: 'filterInput', basePath: '' })
 *
 * Options:
 *   - searchId:       ID for the search input element (default: 'filterInput')
 *   - searchPlaceholder: Placeholder text for search (default: 'Filter links...')
 *   - basePath:       Relative path prefix for assets (e.g., '../' for subfolders)
 *
 * @format
 */

function renderNavbar(options = {}) {
  const {
    searchId = "filterInput",
    searchPlaceholder = "Filter links...",
    basePath = "",
  } = options;

  const header = document.createElement("header");
  header.className = "header";
  header.id = "site-navbar";

  header.innerHTML = `
    <div class="header-inner" id="headerInner">
      <!-- LEFT SECTION: Logo + Title -->
      <div class="header-left">
        <a href="${basePath}index.html" class="navbar-brand" title="Home">
          <div class="logo" id="logoBtn">
            <span class="mark" aria-hidden="true">
              <img src="${basePath}images/img-test1.png" alt="Cixfi Hub" />
            </span>
          </div>
          <span class="navbar-title">Cixfi Resource Hub</span>
        </a>
      </div>

      <!-- MIDDLE SECTION: Search Bar -->
      <div class="header-center">
        <div class="search" role="search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
          </svg>
          <input id="${searchId}" type="search"
                 placeholder="${searchPlaceholder}"
                 aria-label="${searchPlaceholder}" />
        </div>
      </div>

      <!-- RIGHT SECTION: Theme Toggle -->
      <div class="header-right">
        <button class="theme-toggle-btn" id="themeToggle" aria-pressed="false" title="Toggle theme">
          <svg class="theme-icon theme-icon--dark" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg class="theme-icon theme-icon--light" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Insert at the very beginning of <body>
  document.body.insertBefore(header, document.body.firstChild);

  // --- Theme Toggle Logic ---
  const themeToggle = header.querySelector("#themeToggle");

  // Restore saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeButton(next);
  });

  function updateThemeButton(theme) {
    const isLight = theme === "light";
    themeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
    header.querySelector(".theme-icon--dark").style.display = isLight
      ? "none"
      : "block";
    header.querySelector(".theme-icon--light").style.display = isLight
      ? "block"
      : "none";
  }

  // Expose toggleTheme globally for backwards compatibility
  window.toggleTheme = function () {
    themeToggle.click();
  };

  return header;
}
