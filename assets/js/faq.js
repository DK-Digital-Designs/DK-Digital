import { fetchData } from './utils.js';

export async function loadFAQ() {
  const faqs = await fetchData('assets/data/faq.json');
  const list = document.querySelector('.faq-list');

  faqs.forEach(({ q, a }) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q">${q}</button>
      <div class="faq-a">${a}</div>
    `;
    list.append(item);
    item.querySelector('.faq-q').addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}
