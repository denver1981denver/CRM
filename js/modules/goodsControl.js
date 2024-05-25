import fetchRequest from './goods.js';
import {tBody, screenWidth, screenHeight} from './var.js';
import {recalcTotal, getDataError} from './render.js';

// получить стоимость удалённого товара
const getCostDeletedProduct = (err, goods, id) => {
  if (err) {
    console.warn(err);
    return;
  }
  let price;
  let count;
  goods.map(item => {
    if (item.id === id) {
      price = item.price;
      count = item.count;
    }
  });

  recalcTotal(price, count, false);
};

// удаление товара на сервере
const deleteProductServer = async id => {
  await fetchRequest(getCostDeletedProduct, getDataError, null, id);
  await fetchRequest(null, getDataError, id, null, 'DELETE');
};

// функция вызова нового окна с изображением
const getImg = url => {
  const width = (screenWidth - 600) / 2;
  const height = ((screenHeight - 600) / 2);
  const param = `width=600, height=600, left=${width}, top=${height}`;

  open(url, '', param);
};

const goodsControl = () => {
  tBody.addEventListener('click', ({target}) => {
    // удаление строки с товаром в таблице
    if (target.closest('.table__btn-icon-delete')) {
      target.closest('tr').remove();
      const id = target.closest('tr').dataset.id;

      deleteProductServer(id);
    }
    // загрузка изображения
    if (target.closest('.table__btn-icon-img')) {
      const url = target.closest('tr').dataset.pic;
      getImg(url);
    }
  });
};

export default goodsControl;
