import {formatParams} from './tools';

const API_URL = 'https://api.vk.com/method/';
const API_VERSION = 5.87;
const API_APP_TOKEN = '024c7416024c7416024c74' +
  '16f60227f2850024c024c74165f6c944afa65e480428d44d8';
let userAuthToken;

const init = authToken => {
  userAuthToken = authToken;
};

// Don't call vk api, just return api request url
const searchGroups = query => {
  const endpoint = `${API_URL}groups.search`;
  const payload = {
    type: 'group',
    q: query,

    access_token: userAuthToken,
    v: API_VERSION
  };
  return `${endpoint}${formatParams(payload)}`;
};

// Don't call vk api, just return api request url
const getGroupMembers = (gid, offset = 0) => {
  const endpoint = `${API_URL}groups.getMembers`;
  const payload = {
    fields: 'contacts, city',
    group_id: gid,
    offset,

    access_token: API_APP_TOKEN,
    v: API_VERSION
  };
  return endpoint + formatParams(payload);
};

const vk = {
  init,

  groups: {
    search: searchGroups,
    getMembers: getGroupMembers
  }
};
export default vk;
