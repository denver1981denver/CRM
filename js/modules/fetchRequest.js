import {URL, URLCategory, URLSearch, headers} from './var.js';

// функция серверных запросов
const fetchRequest = async (callback,
    {
      getDataError,
      id,
      data,
      method = 'GET',
      body,
      dataSearch,
    }) => {
  let url = URL;
  try {
    const options = {
      method,
    };

    if (body) {
      options.body = JSON.stringify(body);
      options.headers = headers;
    }

    if (id) url = `${URL}/${id}`;
    if (data === 'categories') url = URLCategory;
    if (data === 'search') url = `${URLSearch}${dataSearch}`;
  
    const response = await fetch(url, options);

    if (response.ok) {
      const goods = await response.json();

      if (callback) {
        callback(null, goods, data);
      }

      return goods;
    }
    throw new Error(`Ошибка ${response.status}`);
  } catch (err) {
    if (callback) callback(err);
    if (!callback) console.warn(err);
    if (getDataError) getDataError(err);
  }
};

export default fetchRequest;
