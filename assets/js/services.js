import { fetchData, observer } from './utils.js';

export function loadServices() {
  const section = document.getElementById('services');
  const grid = section.querySelector('.grid');

  const srvObserver = new IntersectionObserver(async ([entry], obs) => {
    if (entry.isIntersecting) {
      const services = await fetchData('assets/data/services.json');
      services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="assets/${service.icon}" alt="${service.title} Icon" loading="lazy">
          <h3>${service.title}</h3>
          <p>${service.desc}</p>
        `;
        grid.appendChild(card);
        observer.observe(card);
      });
      obs.unobserve(section);
    }
  }, { rootMargin: '200px' });

  srvObserver.observe(section);
}
