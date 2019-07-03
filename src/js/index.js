import '../css/index.css';
import cookie from './cookie';
import vk     from './vk';

// noinspection JSUnresolvedVariable
const baseUrl = MODE === 'production' ?
      'https://ceigh.gitlab.io/otoha' : 'http://localhost:9090';
const authUrl = 'https://oauth.vk.com/authorize?client_id=704' +
  `1394&display=page&scope=offline&redirect_uri=${baseUrl}&response_type=token`;
const url = location.href;
const urlData = getJsonFromUrl(url.substr(url.search('#')));
const storedQuery = cookie.get('query');
const input = document.querySelector('#search-block input');

const selectOnClick = el => {
  el.addEventListener('click', () => {
    el.focus();
    el.select();
  });
};
selectOnClick(input);

if ('error' in urlData) location.replace(baseUrl);

if ('access_token' in urlData) {
  cookie.set('token', urlData.access_token);
  location.replace(baseUrl);
} else if (storedQuery) {
  vk.init(cookie.get('token'));
  vk.groups.search(storedQuery);
  cookie.del('query');
}

input.onchange = () => {
  const query = input.value;

  if (!query) return;
  if (storedQuery) cookie.del('query');

  const token = cookie.get('token');

  if (token) {
    vk.init(token);
    vk.groups.search(query);
  } else {
    cookie.set('query', query);
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
