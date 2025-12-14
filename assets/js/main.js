// /assets/js/main.js
const root = document.documentElement;

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("dk_theme", theme);
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "light" ? "☾" : "☀";
}

function initTheme() {
    const saved = localStorage.getItem("dk_theme");
    if (saved === "light" || saved === "dark") return setTheme(saved);

    // default: follow system preference
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
}

function initProgressBar() {
    const bar = document.getElementById("progressBar");
    if (!bar) return;

    const update = () => {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
}

function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    const toggle = () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        btn.classList.toggle("show", y > 600);
    };

    toggle();
    window.addEventListener("scroll", toggle, { passive: true });

    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("primaryNav");
    if (!toggle || !nav) return;

    const close = () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // close on link click
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));

    // close on escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });
}

function initTestimonials() {
    const track = document.getElementById("testiTrack");
    const prev = document.getElementById("testiPrev");
    const next = document.getElementById("testiNext");
    if (!track || !prev || !next) return;

    const slides = Array.from(track.children);
    let index = 0;

    const go = (i) => {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    prev.addEventListener("click", () => go(index - 1));
    next.addEventListener("click", () => go(index + 1));

    // optional auto-advance
    let timer = setInterval(() => go(index + 1), 6500);
    [prev, next, track].forEach(el => {
        el.addEventListener("mouseenter", () => clearInterval(timer));
        el.addEventListener("mouseleave", () => (timer = setInterval(() => go(index + 1), 6500)));
    });
}

function initFooterYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
}

function initFakeSubmit() {
    const btn = document.getElementById("fakeSubmit");
    if (!btn) return;
    btn.addEventListener("click", () => {
        alert("Wire this button to Formspree / Netlify Forms / your API endpoint.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();

    document.getElementById("themeToggle")?.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "light";
        setTheme(current === "light" ? "dark" : "light");
    });

    initProgressBar();
    initBackToTop();
    initMobileNav();
    initTestimonials();
    initFooterYear();
    initFakeSubmit();
});
