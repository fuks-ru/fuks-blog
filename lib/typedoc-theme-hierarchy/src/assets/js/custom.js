for (const item of document.querySelectorAll(
  '.js-category-title:not([data-id="root"])',
)) {
  item.addEventListener('click', () => {
    const list = document.querySelector(
      `.js-category-list[data-id="${item.dataset.id}"]`,
    );

    const icon = document.querySelector(
      `.js-category-icon[data-id="${item.dataset.id}"]`,
    );

    list.classList.toggle('_open');
    icon.classList.toggle('fa-folder-open');
  });
}

(() => {
  const pathname = window.location.pathname.replace('/docs', '');

  let activeElement = document.querySelector(
    `.js-category-link[data-id="${pathname}"]`,
  );

  if (!activeElement) {
    return;
  }

  activeElement.classList.add('_active');

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const parent = activeElement.closest('.js-category-list');

    if (!parent) {
      break;
    }

    parent.classList.add('_open');
    parent.parentNode
      .querySelector('.js-category-icon')
      .classList.add('fa-folder-open');

    activeElement = parent.parentNode;
  }
})();
