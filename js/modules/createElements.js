import loadStyle from './loadStyle.js';
import {URLImage} from './var.js';
import {calcDiscount} from './plugins.js';

// создание окна с подтверждением удаления
export const createModalDelete = async () => {
  await loadStyle('css/modal-delete.css');
  const overlay = document.createElement('div');
  const modalDel = document.createElement('div');
  const wrapper = document.createElement('div');
  const btnCancel = document.createElement('button');
  const btnDelete = document.createElement('button');
  overlay.className = 'overlay';
  modalDel.className = 'modal-delete';
  wrapper.className = 'modal-delete__btn-wrapper';
  btnCancel.className = 'modal-delete__btn modal-delete__btn--cancel';
  btnCancel.type = 'button';
  btnCancel.textContent = 'Отменить';
  btnDelete.className = 'modal-delete__btn modal-delete__btn--delete';
  btnDelete.type = 'button';
  btnDelete.textContent = 'Удалить';
  modalDel.insertAdjacentHTML('beforeend', `
    <p class="modal-delete__title">Вы действительно хотите удалить товар ?</p>
  `);
  wrapper.append(btnDelete, btnCancel);
  modalDel.append(wrapper);
  overlay.append(modalDel);
  document.body.append(overlay);

  return {overlay, btnDelete, btnCancel};
};

// создание окна с ошибкой
export const createErrorWindow = async (dataError) => {
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
export const createRow = product => {
  const tr = document.createElement('tr');
  const {id, title, category, units, count, price, discount, image} = product;

  const total = calcDiscount(price, count, discount);
  tr.dataset.id = id;
  tr.dataset.pic = `${URLImage}${image}`;

  const tdTitle = document.createElement('td');
  const tdID = document.createElement('td');
  const tdCategory = document.createElement('td');
  const tdUnits = document.createElement('td');
  const tdCount = document.createElement('td');
  const tdPrice = document.createElement('td');
  const tdTotal = document.createElement('td');
  const tdIcon = document.createElement('td');
  const btnImage = document.createElement('button');

  tdTitle.textContent = title;
  tdTitle.className = 'table__name';
  tdID.textContent = id;
  tdID.className = 'table__id';
  tdCategory.textContent = category;
  tdCategory.className = 'table__category';
  tdUnits.textContent = units;
  tdUnits.className = 'table__units';
  tdCount.textContent = count;
  tdCount.className = 'table__quantity';
  tdPrice.textContent = `$${price}`;
  tdPrice.className = 'table__price';
  tdTotal.textContent = `$${total}`;
  tdTotal.className = 'table__total';
  tdIcon.className = 'table__icon';
  btnImage.className = 'table__btn-icon table__btn-icon-img';
  btnImage.type = 'button';
  btnImage.insertAdjacentHTML('beforeend',`
    <svg width="20" height="20">
      <use xlink:href="#img"/>
    </svg>
  `);
  tdIcon.append(btnImage);
  tdIcon.insertAdjacentHTML('beforeend',`
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
  `);
  tr.append(
      tdID,
      tdTitle,
      tdCategory,
      tdUnits,
      tdCount,
      tdPrice,
      tdTotal,
      tdIcon,
  );
  tr.tdTitle = tdTitle;
  tr.tdCategory = tdCategory;
  tr.tdUnits = tdUnits;
  tr.tdCount = tdCount;
  tr.tdPrice = tdPrice;
  tr.tdTotal = tdTotal;
  tr.btnImage = btnImage;

  if (image === 'image/notimage.jpg') {
    btnImage.style.display = 'none';
  }
  return tr;
};

const createOptions = select => {
  const option = document.createElement('option');
  option.value = select;

  return option;
};

// создание модального окна
export const createModal = async (id, categories) => {
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
  const modalName = document.createElement('label');
  const inputName = document.createElement('input');
  const modalCategory = document.createElement('label');
  const inputCategory = document.createElement('input');
  const modalUnits = document.createElement('label');
  const inputUnits = document.createElement('input');
  const datalist = document.createElement('datalist');
  const discount = document.createElement('div');
  const checkbox = document.createElement('input');
  const wrapperDiscount = document.createElement('label');
  const quantity = document.createElement('label');
  const inputDiscount = document.createElement('input');
  const description = document.createElement('label');
  const textarea = document.createElement('textarea');
  const modalCount = document.createElement('input');
  const price = document.createElement('label');
  const modalPrice = document.createElement('input');
  const addFile = document.createElement('label');
  const inputFile = document.createElement('input');
  const previewWrapper = document.createElement('div');
  const preview = document.createElement('img');
  const previewRemove = document.createElement('button');
  const errorImg = document.createElement('p');
  const total = document.createElement('div');
  const div = document.createElement('div');
  const modalTotal = document.createElement('span');
  const btnAddProduct = document.createElement('button');
  const close = document.createElement('button');

  modal.classList.add('modal');
  modalContainer.classList.add('modal__container');
  heading.classList.add('modal__heading-wrapper');
  title.classList.add('modal__title');
  title.textContent = id ? 'Изменить товар' : 'Добавить ТОВАР';
  overlay.classList.add('overlay');
  textID.classList.add('modal__id');
  if (id) {
    textID.classList.add('modal__id--open');
    textID.textContent = `id: ${id}`;
  }
  form.classList.add('modal__form');
  fieldset.classList.add('modal__product');
  inputWrapper.classList.add('modal__input-wrapper');
  modalName.insertAdjacentHTML('beforeend',`
    <span class="modal__input-text">Наименование</span>
  `,);
  inputName.classList = 'modal__input';
  inputName.type = 'text';
  inputName.name = 'title';
  inputName.required = 'on';
  modalCategory.insertAdjacentHTML('beforeend',`
    <span class="modal__input-text">Категория</span>  
  `,);
  inputCategory.classList = 'modal__input';
  inputCategory.type = 'text';
  inputCategory.name = 'category';
  inputCategory.setAttribute('list', 'category-list');
  inputCategory.autocomplete = 'off';
  inputCategory.required = 'on';
  modalUnits.insertAdjacentHTML('beforeend',`
    <span class="modal__input-text">Единицы измерения</span>
  `);
  inputUnits.classList = 'modal__input';
  inputUnits.type = 'text';
  inputUnits.name = 'units';
  inputUnits.required = 'on';
  datalist.id = 'category-list';
  const options = categories.map(createOptions);
  datalist.append(...options);
  discount.classList.add('modal__discount');
  checkbox.classList.add('modal__input-checkbox');
  checkbox.type = 'checkbox';
  checkbox.name = 'active';
  wrapperDiscount.insertAdjacentHTML('beforeend',`
    <span class="modal__input-text">Дисконт</span>                
  `);
  inputDiscount.classList.add('modal__input-discount', 'modal__input');
  inputDiscount.type = 'number';
  inputDiscount.name = 'discount';
  inputDiscount.disabled = 'true';
  inputDiscount.min = '0';
  inputDiscount.max = '100';
  description.classList.add('modal__description');
  description.insertAdjacentHTML('beforeend',`
    <span class="modal__input-text">Описание</span>
  `);
  textarea.className = 'modal__input modal__textarea';
  textarea.name = 'description';
  textarea.required = 'on';
  textarea.setAttribute('minlength', '80');
  quantity.classList.add('modal__label', 'modal__quantity');
  quantity.insertAdjacentHTML('beforeend',`
    <span class="modal__input-text ">Количество</span>
  `);
  modalCount.classList.add('modal__input', 'modal__input-count');
  modalCount.type = 'number';
  modalCount.name = 'count';
  modalCount.required = 'true';
  modalCount.min = '1';
  price.classList.add('modal__label', 'modal__price');
  price.insertAdjacentHTML('beforeend',`
    <span class="modal__input-text">Цена</span>
  `);
  modalPrice.classList.add('modal__input', 'modal__input-price');
  modalPrice.type = 'number';
  modalPrice.name = 'price';
  modalPrice.required = 'true';
  modalPrice.min = '0';
  modalPrice.id = 'price';
  addFile.classList.add('modal__add-file');
  inputFile.classList.add('modal__input', 'modal__input-file');
  inputFile.type = 'file';
  inputFile.accept = 'image/*';
  inputFile.name = 'image';
  addFile.insertAdjacentHTML('beforeend',`
    <span class="modal__input-file-text">Добавить изображение</span>
  `);
  errorImg.classList.add('modal__error');
  errorImg.textContent = 'Изображение не должно превышать размер 1 Мб';
  previewWrapper.classList.add('modal__preview-wrapper');
  preview.classList.add('modal__preview');
  preview.height = '200';
  previewRemove.insertAdjacentHTML('beforeend',`
  <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5334 17.45L20 20.9833L16.45 17.45L14.1 19.8L17.65 23.3333L14.1167 26.8667L16.4667 29.2167L20 25.6833L23.5334 29.2167L25.8834 26.8667L22.35 23.3333L25.8834 19.8L23.5334 17.45ZM25.8334 6.66667L24.1667 5H15.8334L14.1667 6.66667H8.33337V10H31.6667V6.66667H25.8334ZM10 31.6667C10 33.5 11.5 35 13.3334 35H26.6667C28.5 35 30 33.5 30 31.6667V11.6667H10V31.6667ZM13.3334 15H26.6667V31.6667H13.3334V15Z"/>
  </svg>
  `);
  previewRemove.type = 'button';
  previewRemove.classList.add('modal__preview-remove');
  total.classList.add('total-cost');
  div.insertAdjacentHTML('beforeend',`
    <p class="total-cost__description">Итоговая стоимость:</p>
    <span class="total-cost__price">&#36;</span>
  `);
  modalTotal.classList.add('total-cost__price', 'total-cost__price-modal');
  modalTotal.textContent = '0';
  btnAddProduct.classList.add('btn-add-product', 'btn-add-product-modal');
  btnAddProduct.type = 'submit';
  btnAddProduct.textContent = 'Добавить товар';
  close.classList.add('modal__btn-close');
  close.type = 'button';
  close.insertAdjacentHTML('beforeend',`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
    <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `);

  modalName.append(inputName);
  modalCategory.append(inputCategory);
  modalUnits.append(inputUnits);
  description.append(textarea);
  div.append(modalTotal);
  total.append(div, btnAddProduct);
  price.append(modalPrice);
  quantity.append(modalCount);
  wrapperDiscount.append(inputDiscount);
  inputWrapper.append(
    modalName,
    modalCategory,
    datalist,
    modalUnits,
    discount,
    description,
    quantity,
    price,
    addFile,
    errorImg,
  );
  discount.append(checkbox, wrapperDiscount);
  heading.append(title, textID);
  addFile.append(inputFile);
  previewWrapper.append(preview, previewRemove);
  fieldset.append(inputWrapper, previewWrapper);
  form.append(fieldset, total);
  modalContainer.append(heading, form, close);
  modal.append(modalContainer);
  overlay.append(modal);
  document.body.append(overlay);

  return {
    form,
    inputWrapper,
    discount: inputDiscount,
    checkbox,
    price: modalPrice,
    count: modalCount,
    total: modalTotal,
    file: inputFile,
    title: inputName,
    category: inputCategory,
    units: inputUnits,
    textarea,
    previewWrapper,
    preview,
    overlay,
  };
};
