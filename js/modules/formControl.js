import fetchRequest from './goods.js';
import {recalcTotal, getDataError} from './render.js';
import {createRow} from './createElements.js';
import {tBody} from './var.js';

// рендеринг товара из формы
const addGoodsPage = contact => {
  tBody.append(createRow(contact));
};
// функция управления формой
export const formControl = ({
  checkbox,
  form,
  discount,
  count,
  price,
  total,
  overlay,
}, id) => {
// идентификация нового товара из данных сервера
  const getNewProduct = (err, newGoods, goods) => {
    if (err) {
      return;
    }

    const newProduct = {};
    newGoods.forEach(item => {
      if (!goods.includes(item.id)) {
        newProduct.item = item;
        newProduct.price = item.price;
        newProduct.count = item.count;
      }
    });

    addGoodsPage(newProduct.item);
    recalcTotal(newProduct.price, newProduct.count, true);
  };

  // вывод общей суммы в модальном окне
  const renderModalTotal = sum => {
    total.textContent = sum;
  };

  // общая сумма стоимости товаров в модальном окне
  const getModalTotal = (price, count) => {
    if (!(count === '' && price === '')) {
      if (count === '') {
        count = 1;
      }
      renderModalTotal(price * count);
    }
  };
  // заполнение таблицы новым товаром данными с сервера
  const edit = (err, goods, dataId) => {
    if (err) {
      return;
    }
    const {
      category,
      count,
      price,
      title,
      units,
    } = goods;

    const tr = document.body.querySelector(`[data-id="${dataId}"]`);
    const tdElems = tr.querySelectorAll('td');

    const arrayTd = Array.from(tdElems);
    const oldPrice = +arrayTd[5].textContent;
    const oldCount = +arrayTd[4].textContent;

    const total = count * price;
    arrayTd[1].textContent = title;
    arrayTd[2].textContent = category;
    arrayTd[3].textContent = units;
    arrayTd[4].textContent = count;
    arrayTd[5].textContent = price;
    arrayTd[6].textContent = total;

    recalcTotal(oldPrice, oldCount);
    recalcTotal(price, count, true);
  };
  // редактирование товара
  const editProductServer = async (newRow, id) => {
    const result = await fetchRequest(null, getDataError, id, null, 'PATCH', newRow);

    if (result) {
      const responseStatus = await fetchRequest(edit, getDataError, id);

      return responseStatus;
    }
  };

  // загрузка нового товара на сервер и получение данных с сервера
  const uploadProductServer = async newRow => {
    const goods = await fetchRequest(null, getDataError);
    const responseStatusPost = await fetchRequest(null, getDataError, null, null, 'POST', newRow);

    if (responseStatusPost) {
      const responseStatus = await fetchRequest(getNewProduct, getDataError, null, goods);

      return responseStatus;
    }
  };

  // получение информации от полей, количество и цена в модальном окне
  form.addEventListener('change', ({target}) => {
    if (target.closest('.modal__input-price') ||
    target.closest('.modal__input-count')) {
      getModalTotal(price.value, count.value);
    }
  });

  // переключение чекбокса для  поля Дисконт
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      discount.disabled = 0;
    } else {
      discount.value = '';
      discount.disabled = 1;
    }
  });

  // добавление товара через форму
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRow = Object.fromEntries(formData);

    const responseStatus = async () => {

      const resultResponseStatus = (id) ? await editProductServer(newRow, id) :
      await uploadProductServer(newRow);

      if (resultResponseStatus) overlay.remove();
    };
    responseStatus();
    form.reset();
  });
};


