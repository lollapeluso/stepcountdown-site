/* Navigation is fully available without JavaScript. No analytics or storage. */
(() => {
  const button = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (!button || !navigation) return;
  const mobile = window.matchMedia('(max-width: 900px)');
  function setOpen(open, restoreFocus = false) {
    navigation.hidden = mobile.matches && !open;
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
    if (restoreFocus) button.focus();
  }
  function sync() {
    button.hidden = !mobile.matches;
    setOpen(false);
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && mobile.matches) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });
  mobile.addEventListener('change', sync);
  sync();
})();
