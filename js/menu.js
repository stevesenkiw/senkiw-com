const button = document.querySelector('.menu-button');
const backdrop = document.querySelector('.menu-backdrop');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  button?.setAttribute('aria-expanded', String(open));
  if (backdrop) backdrop.hidden = !open;
}

button?.addEventListener('click', () => {
  setMenu(!document.body.classList.contains('menu-open'));
});

backdrop?.addEventListener('click', () => setMenu(false));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});
