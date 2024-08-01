import {createRow, createErrorWindow} from './createElements.js';
import {errorWindowControl} from './errorWindowControl.js';
import {tBody, tableTotal, globalCounter as counter} from './var.js';
import {calcDiscount} from './plugins.js';

// рендеринг общей суммы товаров в таблицу
export const renderTableTotal = () => {
  tableTotal.textContent = counter.totalAmountGoods.toFixed(2);
};

// перерасчёт общей суммы товаров после изменений
export const recalcTotal = (data, key) => {
  if (key) {
    counter.totalAmountGoods += data;
    renderTableTotal();
    return;
  } 
    counter.totalAmountGoods -= data;
    if(counter.totalAmountGoods === 0) {
      tableTotal.textContent = 0;
      return
    };
    renderTableTotal();
};

// калькуляция общей суммы товаров
export const getTableTotal = goods => {
  if(goods.goods.length === 0) {
    tableTotal.textContent = 0;
    return
  };
  counter.totalAmountGoods = goods.goods.reduce((acc, item) =>
  acc + calcDiscount(item.price, item.count, item.discount), 0);
  renderTableTotal();
};

// перебор базы данных и рендер таблицы
export const renderGoods = (err, goods) => {
  if (err) {
    console.warn(err);
    return;
  }
  const allRow = goods.goods.map(createRow);
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

// рендеринг товара из в таблицу
export const addGoodsPage = product => {
  tBody.append(createRow(product));
  recalcTotal(calcDiscount(product.price, product.count, product.discount), true);
};
