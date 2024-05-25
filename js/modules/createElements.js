import loadStyle from './loadStyle.js';

// создание окна с ошибкой
export const createErrorWindow = async dataError => {
  await loadStyle('css/window-error.css');
  const windowError = document.createElement('div');
  windowError.classList.add('window-error');
  windowError.insertAdjacentHTML('beforeend', `
  <div class="window-error__container">
  <div class="window-error__img"></div>
  <p class="window-error__message">
  <strong>${dataError}</strong>
  </p>
</div>
<button class="window-error__btn-error">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
    <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
  </svg>
</button>
  `);
  document.body.append(windowError);

  return windowError;
};

// создание строки для таблицы
export const createRow = data => {
  const tr = document.createElement('tr');
  const {
    id,
    title,
    category,
    units,
    count,
    price,
  } = data;

  const total = count * price;
  tr.dataset.id = id;
  tr.dataset.pic = '../../image/test.jpg';
  tr.insertAdjacentHTML('beforeend', `
      <td class="table__id">${id}</td>
      <td>${title}</td>
      <td>${category}</td>
      <td class="table__units">${units}</td>
      <td class="table__quantity">${count}</td>
      <td class="table__price">${price}</td>
      <td class="table__total">${total}</td>
      <td class="table__icon">
        <button class="table__btn-icon table__btn-icon-img" type="button">
          <svg width="20" height="20">
            <use xlink:href="#img"/>
          </svg>
        </button>

        <button class="table__btn-icon table__btn-icon-edit" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path class="stroke" d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 2.8636 16.8982 3.03233V3.03233Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="stroke" d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>                
          </svg>
        </button>

        <button class="table__btn-icon table__btn-icon-delete" type="button">
          <svg width="20" height="20">
            <use xlink:href="#cart"/>
          </svg>
        </button>
      </td>
      `);

  return tr;
};
// создание модального окна
export const createModal = async id => {
  await loadStyle('css/modal.css');

  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const modalContainer = document.createElement('div');
  const heading = document.createElement('div');
  const title = document.createElement('h2');
  const textID = document.createElement('span');
  const form = document.createElement('form');
  const fieldset = document.createElement('fieldset');
  const inputWrapper = document.createElement('div');
  const discount = document.createElement('div');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const quantity = document.createElement('label');
  const inputDiscount = document.createElement('input');
  const description = document.createElement('label');
  const modalCount = document.createElement('input');
  const price = document.createElement('label');
  const modalPrice = document.createElement('input');
  const addFile = document.createElement('label');
  const total = document.createElement('div');
  const div = document.createElement('div');
  const modalTotal = document.createElement('span');
  const btnAddProduct = document.createElement('button');
  const close = document.createElement('button');

  modal.classList.add('modal');
  modalContainer.classList.add('modal__container');
  heading.classList.add('modal__heading-wrapper');
  title.classList.add('modal__title');
  title.textContent = (id) ? 'Изменить товар' : 'Добавить ТОВАР';
  overlay.classList.add('overlay');
  textID.classList.add('modal__id');
  if (id) {
    textID.classList.add('modal__id--open');
    textID.textContent = `id: ${id}`;
  }
  form.classList.add('modal__form');
  fieldset.classList.add('modal__product');
  inputWrapper.classList.add('modal__input-wrapper');
  inputWrapper.insertAdjacentHTML('beforeend', `
    <label class="modal__name">
    <span class="modal__input-text">Наименование</span>
    <input class="modal__input" type="text" name ="title" required>
    </label>

    <label class="modal__category">
    <span class="modal__input-text">Категория</span>  
    <input class="modal__input" type="text" name="category" required>
    </label>

    <label class="modal__units">
    <span class="modal__input-text">Единицы измерения</span>
    <input class="modal__input" type="text" name="units" required>
    </label>    
  `);
  discount.classList.add('modal__discount');
  checkbox.classList.add('modal__input-checkbox');
  checkbox.type = 'checkbox';
  checkbox.name = 'active';
  label.insertAdjacentHTML('beforeend', `
    <span class="modal__input-text">Дисконт</span>                
  `);
  inputDiscount.classList.add('modal__input-discount');
  inputDiscount.type = 'text';
  inputDiscount.name = 'discount';
  inputDiscount.disabled = 'true';
  description.classList.add('modal__description');
  description.insertAdjacentHTML('beforeend', `
    <span class="modal__input-text">Описание</span>
    <textarea class="modal__input modal__textarea" name="description" required></textarea>
  `);
  quantity.classList.add('modal__label', 'modal__quantity');
  quantity.insertAdjacentHTML('beforeend', `
    <span class="modal__input-text ">Количество</span>
  `);
  modalCount.classList.add('modal__input', 'modal__input-count');
  modalCount.type = 'number';
  modalCount.name = 'count';
  modalCount.required = 'true';
  price.classList.add('modal__label', 'modal__price');
  price.insertAdjacentHTML('beforeend', `
    <span class="modal__input-text">Цена</span>
  `);
  modalPrice.classList.add('modal__input', 'modal__input-price');
  modalPrice.type = 'number';
  modalPrice.name = 'price';
  modalPrice.required = 'true';
  modalPrice.id = 'price';
  addFile.classList.add('modal__add-file');
  addFile.insertAdjacentHTML('beforeend', `
    <input class="modal__input modal__input-file" type="file" accept="image/jpeg,image/png" multiple name="image">
    <span class="modal__input-file-text">Добавить изображение</span>
  `);
  total.classList.add('total-cost');
  div.insertAdjacentHTML('beforeend', `
    <p class="total-cost__description">Итоговая стоимость:</p>
    <span class="total-cost__price">&#8381;</span>
  `);
  modalTotal.classList.add('total-cost__price', 'total-cost__price-modal');
  modalTotal.textContent = '0';
  btnAddProduct.classList.add('btn-add-product', 'btn-add-product-modal');
  btnAddProduct.type = 'submit';
  btnAddProduct.textContent = 'Добавить товар';
  close.classList.add('modal__btn-close');
  close.type = 'button';
  close.insertAdjacentHTML('beforeend', `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
    <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `);

  div.append(modalTotal);
  total.append(div, btnAddProduct);
  price.append(modalPrice);
  quantity.append(modalCount);
  label.append(inputDiscount);
  inputWrapper.append(discount, description, quantity, price, addFile);
  discount.append(checkbox, label);
  heading.append(title, textID);
  fieldset.append(inputWrapper);
  form.append(fieldset, total);
  modalContainer.append(heading, form, close);
  modal.append(modalContainer);
  overlay.append(modal);
  document.body.append(overlay);

  return {
    form,
    discount: inputDiscount,
    checkbox,
    price: modalPrice,
    count: modalCount,
    total: modalTotal,
    overlay,
  };
};
