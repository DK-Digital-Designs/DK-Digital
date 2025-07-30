import { loadIncludes } from './includes.js';
import { initThemeToggle } from './theme.js';
import { initNav } from './nav.js';
import { animateHero } from './hero.js';
import { loadServices } from './services.js';
import { loadAbout } from './about.js';
import { loadTestimonials } from './testimonials.js';
import { loadFAQ } from './faq.js';
import { loadTeam } from './team.js';
import { initContactForm } from './contact.js';

window.addEventListener('DOMContentLoaded', async () => {
  await loadIncludes(); // ⬅️ Wait for header/footer to load

  initThemeToggle();
  initNav();
  animateHero();
  loadServices();
  await loadAbout();
  await loadTestimonials();
  await loadFAQ();
  await loadTeam();
  initContactForm();
});
