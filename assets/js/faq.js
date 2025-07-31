import { fetchData } from './utils.js';

export async function loadFAQ() {
  const faqs = await fetchData('assets/data/faq.json');
  const list = document.querySelector('.faq-list');

  faqs.forEach(({ q, a }) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q" aria-expanded="false">${q}</button>
      <div class="faq-a" hidden>${a}</div>
    `;
    const button = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    button.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen);
      answer.hidden = !isOpen;
    });

    list.append(item);
  });
}
