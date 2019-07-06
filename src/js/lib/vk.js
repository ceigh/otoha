import {formatParams} from './tools';

const API_URL = 'https://api.vk.com/method/';
const API_VERSION = 5.87;
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
    v: API_VERSION,
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

    access_token: userAuthToken,
    v: API_VERSION,
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
