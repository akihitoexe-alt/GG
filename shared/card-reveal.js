(function () {
  const body = document.body;
  const allowedFamilies = new Set(["xyz-dragon", "phantom-knights-xyz", "rank-up-magic"]);

  if (!body || body.dataset.cardReveal !== "featured" || !allowedFamilies.has(body.dataset.revealFamily)) {
    return;
  }

  const i18n = window.GG_I18N;
  const settings = {
    title: body.dataset.revealTitle || document.querySelector(".card-name")?.textContent?.trim() || document.title,
    rarity: body.dataset.revealRarity || document.querySelector(".rarity-badge")?.textContent?.trim() || "Featured Card",
    attribute: body.dataset.revealAttribute || document.querySelector(".attribute-badge")?.textContent?.trim() || "CARD",
    tagline: body.dataset.revealTagline || "A high-class card has entered the spotlight.",
    art: body.dataset.revealArt || document.querySelector(".artwork-frame img")?.getAttribute("src") || "",
    accent: normalizeHex(body.dataset.revealAccent, "#9b5cff"),
    secondary: normalizeHex(body.dataset.revealSecondary, "#29f7ff")
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeReveal = null;

  const controls = ensureControls();
  const replayButton = ensureReplayButton(controls);
  updateControlText();
  replayButton.addEventListener("click", () => startReveal());
  document.addEventListener("gg:languagechange", updateControlText);

  window.GG_CARD_REVEAL = {
    replay: () => startReveal(),
    isRunning: () => Boolean(activeReveal)
  };

  startReveal();

  function ensureControls() {
    let nav = document.querySelector(".card-page-nav");
    if (!nav) {
      nav = document.createElement("nav");
      nav.className = "card-page-nav";
      nav.setAttribute("aria-label", "Card page actions");
      body.appendChild(nav);
    }
    return nav;
  }

  function ensureReplayButton(nav) {
    let button = nav.querySelector(".card-page-nav__replay");
    if (button) return button;

    button = document.createElement("button");
    button.className = "card-page-nav__button card-page-nav__replay";
    button.type = "button";

    const hubLink = nav.querySelector(".card-page-nav__link");
    if (hubLink) {
      nav.insertBefore(button, hubLink);
    } else {
      nav.appendChild(button);
    }

    return button;
  }

  function updateControlText() {
    const replayText = i18n?.t?.("reveal.replay", "Replay") || "Replay";
    const replayLabel = i18n?.t?.("reveal.replayLabel", "Replay card reveal sequence") || "Replay card reveal sequence";
    replayButton.textContent = replayText;
    replayButton.setAttribute("aria-label", replayLabel);
  }

  function getRevealText() {
    return {
      skip: i18n?.t?.("reveal.skip", "Skip") || "Skip",
      skipLabel: i18n?.t?.("reveal.skipLabel", "Skip card reveal") || "Skip card reveal",
      leftSmall: i18n?.t?.("reveal.leftSmall", "Lunar scan") || "Lunar scan",
      leftStrong: i18n?.t?.("reveal.leftStrong", "Signal found") || "Signal found",
      focus: i18n?.t?.("reveal.focus", "Focus card") || "Focus card"
    };
  }

  function startReveal() {
    if (activeReveal) return;

    const revealText = getRevealText();
    const accentRgb = hexToRgb(settings.accent).join(", ");
    const overlay = document.createElement("section");
    overlay.className = "card-reveal-stage";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `${settings.title} reveal`);
    overlay.style.setProperty("--reveal-accent", settings.accent);
    overlay.style.setProperty("--reveal-accent-rgb", accentRgb);
    overlay.style.setProperty("--reveal-secondary", settings.secondary);
    if (settings.art) {
      overlay.style.setProperty("--reveal-art-fill", cssUrl(settings.art));
    }

    const artMarkup = settings.art
      ? `<img class="card-reveal-art" src="${escapeAttribute(settings.art)}" alt="">`
      : `<div class="card-reveal-symbol">${escapeHtml(initials(settings.title))}</div>`;

    overlay.innerHTML = `
      <button class="card-reveal-skip" type="button" aria-label="${escapeAttribute(revealText.skipLabel)}">${escapeHtml(revealText.skip)}</button>
      <div class="card-reveal-presenter left" aria-hidden="true">
        <span>${escapeHtml(revealText.leftSmall)}</span>
        <strong>${escapeHtml(revealText.leftStrong)}</strong>
      </div>
      <div class="card-reveal-presenter right" aria-hidden="true">
        <span>Solar scan</span>
        <strong>${escapeHtml(settings.attribute)}</strong>
      </div>
      <div class="card-reveal-core">
        <div class="card-reveal-label" aria-hidden="true">
          <span>${escapeHtml(revealText.focus)}</span>
          <span>${escapeHtml(settings.rarity)}</span>
        </div>
        <div class="card-reveal-orbit" aria-hidden="true">
          <div class="card-reveal-energy"></div>
          <div class="card-reveal-card">
            <div class="card-reveal-face card-reveal-back"></div>
            <div class="card-reveal-face card-reveal-front">
              ${artMarkup}
              <div class="card-reveal-nameplate">${escapeHtml(settings.title)}</div>
              <div class="card-reveal-decode" aria-hidden="true"></div>
            </div>
          </div>
        </div>
        <div class="card-reveal-copy" aria-live="polite">
          <div class="card-reveal-title">${escapeHtml(settings.title)}</div>
          <div class="card-reveal-tagline">${escapeHtml(settings.tagline)}</div>
        </div>
      </div>
    `;

    body.classList.remove("reveal-complete", "card-page-decode");
    body.classList.add("reveal-running");
    body.appendChild(overlay);

    const skipButton = overlay.querySelector(".card-reveal-skip");
    let finished = false;
    const timers = [];
    const queue = (fn, delay) => {
      const timer = window.setTimeout(fn, delay);
      timers.push(timer);
    };

    activeReveal = { overlay, timers };

    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(window.clearTimeout);
      overlay.classList.add("is-exiting");
      body.classList.remove("reveal-running");
      body.classList.add("reveal-complete");
      queue(() => {
        overlay.remove();
        activeReveal = null;
        document.getElementById("yugioh-card")?.focus?.();
      }, reducedMotion ? 80 : 560);
    };

    skipButton.addEventListener("click", finish);
    overlay.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        finish();
      }
    });

    requestAnimationFrame(() => {
      overlay.classList.add("is-scanning");
      skipButton.focus({ preventScroll: true });
    });

    if (reducedMotion) {
      overlay.classList.add("is-spinning", "is-decoding", "is-revealing");
      queue(finish, 1300);
    } else {
      queue(() => overlay.classList.add("is-spinning"), 650);
      queue(() => overlay.classList.add("is-decoding"), 2400);
      queue(() => overlay.classList.add("is-revealing"), 3900);
      queue(finish, 6100);
    }
  }

  function normalizeHex(value, fallback) {
    if (!value || !/^#[0-9a-fA-F]{6}$/.test(value)) return fallback;
    return value;
  }

  function hexToRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
  }

  function initials(text) {
    return text
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function escapeAttribute(value) {
    try {
      return escapeHtml(new URL(value, window.location.href).href);
    } catch {
      return escapeHtml(value);
    }
  }

  function cssUrl(value) {
    try {
      const href = new URL(value, window.location.href).href;
      return `url("${href.replace(/["\\]/g, "\\$&")}")`;
    } catch {
      return "none";
    }
  }
})();
