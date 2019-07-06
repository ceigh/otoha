import cookie                   from './cookie';
import {addScript, createError} from './tools';
import vk                       from './vk';

window.parser = {
  get: {
    groups: data => {
      if ('error' in data) {
        // noinspection JSUnresolvedVariable
        createError(data.error.error_msg);
        cookie.del('token');
        return;
      }

      const items = Array.from(data.response.items);
      console.log(items);
      addScript(vk.groups.getMembers(items[0].id) +
        '&callback=parser.get.members');
    },

    members: data => {
      if ('error' in data) {
        // noinspection JSUnresolvedVariable
        createError(data.error.error_msg);
        cookie.del('token');
        return;
      }

      console.log(data.response);
    }
  }
};

const parser = {
  start: (token, query) => {
    vk.init(token);
    addScript(vk.groups.search(query) +
      '&callback=parser.get.groups');
  }
};
export default parser;
