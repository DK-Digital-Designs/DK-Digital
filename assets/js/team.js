import { fetchData } from './utils.js';

export async function loadTeam() {
  const members = await fetchData('assets/data/team.json');
  const grid = document.querySelector('.team-grid');

  members.forEach(({ name, role, photo }) => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <img src="assets/${photo}" alt="${name}" loading="lazy">
      <h3>${name}</h3>
      <p>${role}</p>
    `;
    grid.append(card);
  });
}
