import cookie                   from './cookie';
import {addScript, createError} from './tools';
import validator                from './validator';
import vk                       from './vk';


let goods;

window.parser = {
  get: {
    groups: data => {
      if ('error' in data) {
        // noinspection JSUnresolvedVariable
        createError(data.error.error_msg);
        cookie.del('token');
        return;
      }

      goods = [];

      const gids = Array.from(data.response.items)
                        .map((item) => item.id)
                        .sort(() => Math.random())
                        .slice(0, 400);

      gids.forEach(gid => {
        addScript(vk.groups.getMembers(gid) +
                  '&callback=parser.get.members');
      });
    },

    members: data => {
      if ('error' in data) {
        // noinspection JSUnresolvedVariable
        createError(data.error.error_msg);
        cookie.del('token');
        return;
      }

      const members = Array.from(data.response.items);

      members.forEach(item => {
        if ('deactivated' in item || !('mobile_phone' in item) ||
            !('city' in item)) return;

        const city  = item.city.title,
              phone = item.mobile_phone;

        if (validator.check(phone)) {
          goods.push([item.first_name,
                      item.last_name,
                      city,
                      validator.clean(phone)]);
        }
      });

      // csv_write(goods, path)
      // delete_duplicates(path)
      console.log(goods);
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
