import { fetchData, observer } from './utils.js';

export function loadServices() {
  const section = document.getElementById('services');
  const grid = section.querySelector('.grid');

  const srvObserver = new IntersectionObserver(async ([entry], obs) => {
    if (entry.isIntersecting) {
      const services = await fetchData('assets/data/services.json');
      services.forEach(item => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="assets/${item.icon}" alt="${item.title} Icon" loading="lazy">
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
  `;
  grid.append(card);
});

      obs.unobserve(section);
    }
  }, { rootMargin: '200px' });

  srvObserver.observe(section);
}
