import {URL, headers} from './var.js';

// функция фетч запросов
const fetchRequest = async (callback, dataError, id, data, method = 'GET', body) => {
  let url = URL;
  try {
    const options = {
      method,
    };
    if (body) {
      options.body = JSON.stringify(body);
      options.headers = headers;
    }
    if (id) {
      url = `${URL}/${id}`;
    }

    const response = await fetch(url, options);

    if (response.ok) {
      const goods = await response.json();
      if (callback && id) {
        callback(null, goods, id);
        return goods;
      }
      if (callback) {
        callback(null, goods.goods, data);
      }
      if (method === 'POST' || method === 'PATCH') {
        return goods;
      }

      return goods.goods;
    }
    throw new Error(`Ошибка ${response.status}`);
  } catch (err) {
    if (callback) callback(err);
    if (!callback) console.warn(err);
    if (dataError) dataError(err);
  }
};

export default fetchRequest;
