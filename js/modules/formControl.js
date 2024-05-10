import {fetchRequest} from './goods.js';
import {recalcTotal, getDataError} from './render.js';

import {createRow} from './createElements.js';
import {
  modalForm as form,
  checkboxDiscount as checkbox,
  inputDiscount as discount,
  modalTotal as total,
  modalPrice as price,
  modalCount as count,
  tBody,
} from './var.js';

// рендеринг товара из формы
const addGoodsPage = (contact) => {
  tBody.append(createRow(contact));
};

// идентификация нового товара из данных сервера
const getNewProduct = (err, newGoods, goods) => {
  if (err) {
    console.warn(err);
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

// загрузка нового товара на сервер и получение данных с сервера
const uploadProductServer = async (newRow) => {
  const goods = await fetchRequest(null, getDataError);
  const responseStatusPost = await fetchRequest(null, getDataError, null, 'POST', newRow);

  let responseStatus;
  if (responseStatusPost) {
    responseStatus = await fetchRequest(getNewProduct, getDataError, goods);
  }

  return responseStatus;
};

export const formControl = closeModal => {
// получение информации от полей, количество и цена в модальном окне
  form.addEventListener('change', (e) => {
    const target = e.target;

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
      const result = await uploadProductServer(newRow);

      if (result) {
        closeModal();
      }
    };
    responseStatus();
    form.reset();
  });
};


