import '../css/index.css';
import cookie from './cookie';

// If change, don't forget to also change on vk.com/dev
const baseUrl = 'http://localhost:9090';
const authUrl = 'https://oauth.vk.com/authorize?client_id' +
  `=7041394&display=page&scope=offline&redirect_uri=${baseUrl}&response_type=token`;
const url = location.href;
const urlData = getJsonFromUrl(url.substr(url.search('#')));

const input = document.querySelector('#search-block input');
const selectOnClick = el => {
  el.addEventListener('click', () => {
    el.focus();
    el.select();
  });
};

selectOnClick(input);

if ('access_token' in urlData) {
  cookie.set('token', urlData.access_token);
  location.replace(baseUrl);
}

input.onchange = () => {
  const token = cookie.get('token');

  if (token) {
    console.log(token);
  } else {
    location.replace(authUrl);
  }
};


function getJsonFromUrl(url) {
  if (!url) url = location.href;
  const query = url.substr(1);
  const result = {};

  query.split('&').forEach(function(part) {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
