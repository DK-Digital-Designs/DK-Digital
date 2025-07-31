export async function loadAbout() {
  try {
    const about = await fetchData('assets/data/about.json');
    document.querySelector('.about-text h3').textContent = about.heading;
    document.querySelector('.about-text p').textContent = about.text;
    document.querySelector('.about-image img').src = `assets/images/${about.image}`;
  } catch (err) {
    console.error('❌ Failed to load About section:', err);
  }
}
