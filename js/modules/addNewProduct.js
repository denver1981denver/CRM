import fetchRequest from './fetchRequest.js';
import {getDataError, addGoodsPage} from './render.js';

// идентификация нового товара из данных сервера
const getNewProduct = (err, newGoods, goods) => {
  if (err) {
    console.warn(err);
    return;
  }

  const newProduct = {};
  newGoods.goods.forEach(item => {
    if (!goods.goods.includes(item.id)) {
      newProduct.item = item;
    }
  });

  addGoodsPage(newProduct.item);
};

// загрузка нового товара на сервер и получение данных с сервера
const uploadProductServer = async newRow => {
  const goods = await fetchRequest(null, {getDataError});

  if (goods) {
    const responseStatusPost = await fetchRequest(null, {getDataError, method: 'POST', body: newRow});
    if (responseStatusPost) {
      const responseStatus = await fetchRequest(getNewProduct, {getDataError, data: goods});

      return responseStatus;
    }
  }
};

export default uploadProductServer;
