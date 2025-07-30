import { fetchData } from './utils.js';

export async function loadTestimonials() {
  const data = await fetchData('assets/data/testimonials.json');
  const carousel = document.querySelector('.testi-carousel');
  const slides = [];

  data.forEach(({ quote, author, avatar }, i) => {
    const slide = document.createElement('div');
    slide.className = 'testi-slide';
    if (i === 0) slide.classList.add('active');
    slide.innerHTML = `
      <p class="testi-quote">“${quote}”</p>
      <div class="testi-author">
        <img src="assets/${avatar}" alt="${author}" loading="lazy">
        <span>${author}</span>
      </div>
    `;
    carousel.append(slide);
    slides.push(slide);
  });

  let idx = 0;
  const show = newIndex => {
    slides[idx].classList.remove('active');
    idx = (newIndex + slides.length) % slides.length;
    slides[idx].classList.add('active');
  };

  document.querySelector('.testi-next')?.addEventListener('click', () => show(idx + 1));
  document.querySelector('.testi-prev')?.addEventListener('click', () => show(idx - 1));
  setInterval(() => show(idx + 1), 6000);
}
