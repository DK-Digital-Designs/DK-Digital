export function animateHero() {
  anime.timeline({ easing: 'easeOutExpo', duration: 700 })
    .add({ targets: '.hero-content h1', opacity: [0,1], translateY: [20,0] })
    .add({ targets: '.hero-content p', opacity: [0,1], translateY: [20,0] }, '-=500')
    .add({ targets: '.hero-content .btn', opacity: [0,1], translateY: [20,0] }, '-=400');

  document.querySelector('.btn')?.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
}
