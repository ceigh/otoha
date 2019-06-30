import '../css/index.css';

const input = document.querySelector('#search-block input');

const selectOnClick = el => {
  el.addEventListener('click', () => {
    el.focus();
    el.select();
  });
};

selectOnClick(input);
