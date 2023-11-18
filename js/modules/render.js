import createRow from './createElements.js';
import goods from './goods.js';
import {tBody, tableTotal, totalAmount as total} from './var.js';

// Перезапись итоговой стоимости на странице
export const renderTableTotal = () => {
  tableTotal.textContent = total.count;
};

// получение итоговой стоимости товара
const getTotalItem = (price, count) => price * count;

// перерасчёт общей стоимости всех товаров
export const recalcTotal = (id, key) => {
  const product = goods.find(item => item.id === id);
  const sum = getTotalItem(product.price, product.count);

  if (key) {
    total.count += sum;
  } else {
    total.count -= sum;
  }
};

// вычисление общей стоимости товаров  в таблице
export const getTableTotal = () => {
  total.count = goods.reduce((acc, item) =>
    acc + item.price * item.count, 0);

  renderTableTotal();
};

// перебор базы данных и рендер таблицы
export const renderGoods = () => {
  const allRow = goods.map(createRow);
  tBody.append(...allRow);

  getTableTotal();
};


