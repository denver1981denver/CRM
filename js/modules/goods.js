import {URL, headers} from './var.js';

// функция фетч запросов
export const fetchRequest = async (callback, dataError, data, method = 'GET', body) => {
  let url = URL;
  try {
    const options = {
      method,
    };
    if (body) {
      options.body = JSON.stringify(body);
      options.headers = headers;
    }

    if (method === 'DELETE') {
      url = `${URL}/${data}`;
    }

    const response = await fetch(url, options);

    if (response.ok) {
      const goods = await response.json();

      if (callback) {
        callback(null, goods.goods, data);
      }
      if (method === 'POST') {
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


