import goods from './goods.js';
import {tBody} from './var.js';
import {renderTableTotal, recalcTotal} from './render.js';

// удаление объекта из базы данных
const removeItemGoods = id => {
  goods.filter(item => item.id !== id);
};

// удаление строки с товаром в таблице
export const deleteControl = () => {
  tBody.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.table__btn-icon-delete')) {
      target.closest('tr').remove();
      const id = +target.closest('tr').dataset.rowID;
      removeItemGoods(id);
      recalcTotal(id, false);
      renderTableTotal();
    }
  });
};

export default deleteControl;
