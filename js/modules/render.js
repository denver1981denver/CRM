import {createRow, createErrorWindow} from './createElements.js';
import {errorWindowControl} from './errorWindowControl.js';
import {tBody, tableTotal, totalAmount as total} from './var.js';

// Перезапись итоговой стоимости на странице
export const renderTableTotal = () => {
  tableTotal.textContent = total.count;
};

// получение итоговой стоимости товара
const getTotalItem = (price, count) => price * count;

// перерасчёт общей стоимости всех товаров
export const recalcTotal = (price, count, key) => {
  const sum = getTotalItem(price, count);
  if (key) {
    total.count += sum;
  } else {
    total.count -= sum;
  }
  renderTableTotal();
};

// вычисление общей стоимости товаров  в таблице
export const getTableTotal = goods => {
  total.count = goods.reduce((acc, item) =>
    acc + item.price * item.count, 0);

  renderTableTotal();
};

// перебор базы данных и рендер таблицы
export const renderGoods = (err, goods) => {
  if (err) {
    console.warn(err);
    return;
  }
  const allRow = goods.map(createRow);
  tBody.append(...allRow);

  getTableTotal(goods);
};

// рендер окна с ошибкой
const renderDataError = async err => {
  const windowError = await createErrorWindow(err);
  errorWindowControl(windowError);
};

// получение данных ошибки
export const getDataError = err => {
  if (err.name === 'TypeError') {
    err = 'Что-то пошло не так';
  }

  renderDataError(err);
};

