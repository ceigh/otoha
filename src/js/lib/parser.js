import cookie      from './cookie';
import Csv         from './csv';
import error       from './error';
import {addScript} from './tools';
import validator   from './validator';
import vk          from './vk';


let queryName;
let goods = [];
let iteration = 0;
let maxIteration = 0;

window.parser = {
  get: {
    groups: data => {
      if ('error' in data) {
        // noinspection JSUnresolvedVariable
        error.create(data.error.error_msg);
        cookie.del('token');
        return;
      }

      goods = [];
      iteration = 0;
      maxIteration = 0;

      const gids = Array.from(data.response.items)
                        .map((item) => item.id)
                        .sort(() => Math.random())
                        .slice(0, 400);
      maxIteration = gids.length;

      gids.forEach(gid => {
        addScript(vk.groups.getMembers(gid) +
                  '&callback=parser.get.members');
      });
    },

    members: data => {
      iteration++;
      if (maxIteration === iteration) {
        if (!goods.length) {
          error.create('No data');
          return;
        }
        const headers = ['first name', 'last name', 'city', 'phone'];
        const csv = new Csv(
            goods, queryName, headers);
        csv.download();
        return;
      }

      if ('error' in data) {
        // noinspection JSUnresolvedVariable
        error.create(data.error.error_msg);
        cookie.del('token');
        return;
      }

      const members = Array.from(data.response.items);
      members.forEach(item => {
        if ('deactivated' in item || !('mobile_phone' in item) ||
            !('city' in item)) {
          return;
        }

        const city  = item.city.title,
              phone = item.mobile_phone;

        if (validator.check(phone)) {
          // delete_duplicates(path)
          // noinspection JSUnresolvedVariable
          goods.push([item.first_name,
                      item.last_name,
                      city,
                      validator.clean(phone)]);
        }
      });
    }
  }
};

const parser = {
  start: (token, query) => {
    error.remove();

    queryName = query;

    vk.init(token);
    addScript(vk.groups.search(query) +
              '&callback=parser.get.groups');
  }
};
export default parser;
