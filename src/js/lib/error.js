const errorP = document.querySelector('#search-block p');

const createError = message => {
  errorP.innerText = message;
  errorP.setAttribute('title', message);
  errorP.style.display = 'initial';
};

const removeError = () => {
  errorP.innerText = '';
  errorP.removeAttribute('title');
  errorP.style.display = 'none';
};

const error = {
  create: createError,
  remove: removeError
};
export default error;
