export function initNav() {
  const toggle = document.getElementById('menuToggle');
  toggle?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
  });

  const prog = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    prog.style.width = (pct * 100) + '%';
  });
}
