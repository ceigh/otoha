import cookie from './cookie';

const base = 'https://api.vk.com/method/';
const version = 5.87;
let token;
window.CallbackReg = {};

const error = message => {
  const errorP = document.querySelector('#search-block p');
  errorP.innerText = message;
  errorP.setAttribute('title', message);
  errorP.style.display = 'initial';
};

const init = auth_token => token = auth_token;

const addScript = src => {
  const el = document.createElement('script');
  el.src = src;
  document.head.appendChild(el);
};

const groups_search = query => {
  const endpoint = `${base}groups.search`;
  const payload = {
    access_token: token,
    v: version,
    q: query,
    type: 'group'
  };
  const url = endpoint + formatParams(payload);

  window.CallbackReg.groups_search = data => {
    if ('error' in data) {
      cookie.del('token');
      error(data.error.error_msg);
    } else {
      console.log(data.response);
    }
  };

  addScript(`${url}&callback=CallbackReg.groups_search`);
};


function formatParams(params) {
  return '?' + Object
    .keys(params)
    .map(function(key) {
      return key + '=' + encodeURIComponent(params[key]);
    })
    .join('&');
}


const vk = {
  init,
  groups: {
    search: groups_search
  }
};
export default vk;
