import goods from './goods.js';
import {tBody, screenWidth, screenHeight} from './var.js';
import {renderTableTotal, recalcTotal} from './render.js';

// удаление объекта из базы данных
const removeItemGoods = id => {
  goods.filter(item => item.id !== id);
};

// функция вызова нового окна
const getImg = url => {
  const width = (screenWidth - 600) / 2;
  const height = ((screenHeight - 600) / 2);
  const param = `width=600, height=600, left=${width}, top=${height}`;

  open(url, '', param);
};

export const goodsControl = () => {
  tBody.addEventListener('click', e => {
    const target = e.target;
  // удаление строки с товаром в таблице
    if(target.closest('.table__btn-icon-delete')) {
      target.closest('tr').remove();
      const id = +target.closest('tr').dataset.id;
      removeItemGoods(id);
      recalcTotal(id, false);
      renderTableTotal();
    }
// загрузка изображения
    if(target.closest('.table__btn-icon')) {
      const url = target.closest('tr').dataset.pic;
      getImg(url);
    }
  });
};

export default goodsControl;
