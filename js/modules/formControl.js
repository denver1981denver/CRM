import goods from './goods.js';
import {renderTableTotal, recalcTotal} from './render.js';
import createRow from './createElements.js';
import {
  modalForm as form,
  checkboxDiscount as checkbox,
  inputDiscount as discount,
  modalTotal as total,
  modalPrice as price,
  modalCount as count,
  tBody,
} from './var.js';

// создание рандомного идентификатора при добавлении товара пользователем
const getId = () => {
  // проверка ID на уникальность
  const checkId = (data) => goods.find(item => item.id === data);

  let result;
  do {
    result = Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
  } while (checkId());

  result = '2' + result;
  return +result;
};

// добавление объекта в базу данных и вывод базы в консоль
const addDatabaseGoods = data => {
  goods.push(data);
};

// рендеринг товара из формы
const addGoodsPage = (contact) => {
  tBody.append(createRow(contact));
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
    newRow.id = getId();
    addGoodsPage(newRow);
    addDatabaseGoods(newRow);
    recalcTotal(newRow.id, true);
    renderTableTotal();
    form.reset();
    closeModal();
  });
};


