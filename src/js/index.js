import '../css/index.css';
import cookie                                        from './lib/cookie';
import parser                                        from './lib/parser';
import {formatParams, getJsonFromUrl, selectOnClick} from './lib/tools';


const PRODUCTION_URL = 'https://ceigh.gitlab.io/otoha';
const DEVELOPMENT_URL = 'http://localhost:9090';
// MODE from webpack.definePlugin ('production' || 'development')
// noinspection JSUnresolvedVariable
const BASE_URL = MODE === 'production' ? PRODUCTION_URL : DEVELOPMENT_URL;
const AUTH_ENDPOINT = 'https://oauth.vk.com/authorize';
const AUTH_PAYLOAD = {
  display: 'page',
  scope: 'offline',
  response_type: 'token',
  client_id: 7041394,
  redirect_uri: BASE_URL
};
const AUTH_URL = `${AUTH_ENDPOINT}${formatParams(AUTH_PAYLOAD)}`;

const url = location.href;
const urlData = getJsonFromUrl(url.substr(url.search('#')));
const storedQuery = cookie.get('query');
const input = document.querySelector('#search-block input');


if ('error' in urlData) location.replace(BASE_URL);
if ('access_token' in urlData) {
  cookie.set('token', urlData.access_token);
  location.replace(BASE_URL);
} else if (storedQuery) {
  parser.start(cookie.get('token'), storedQuery);
  cookie.del('query');
}

selectOnClick(input);
input.onblur = () => {
  if (!input.value) return;
  input.value = '';
};
input.onkeydown = e => {
  const query = input.value;
  if (!query) return;

  if (e.key === 'Escape') {
    input.value = '';
  } else if (e.key === 'Enter') {
    if (storedQuery) cookie.del('query');

    const token = cookie.get('token');
    if (token) {
      parser.start(token, query);
      input.value = '';
    } else {
      cookie.set('query', query);
      location.replace(AUTH_URL);
    }
  }
};
