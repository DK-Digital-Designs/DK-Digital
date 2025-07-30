export async function loadIncludes() {
  const header = await fetch('assets/shared/header.html').then(res => res.text());
  document.getElementById('header-include').innerHTML = header;

  const footer = await fetch('assets/shared/footer.html').then(res => res.text());
  document.getElementById('footer-include').innerHTML = footer;
}
