import fetchRequest from './fetchRequest.js';
import {getDataError} from './render.js';
import {URLImage, globalCounter as counter} from './var.js';
import {calcDiscount, checkValidInput, toBase64} from './plugins.js';
import uploadProductServer from './addNewProduct.js';
import editProductServer from './editProduct.js';

// функция управления формой
export const formControl = async ({
  form,
  inputWrapper,
  checkbox,
  discount,
  count,
  price,
  total,
  file,
  title,
  category,
  units,
  textarea,
  previewWrapper,
  preview,
  overlay,
}, id, editTr) => {

  // вывод общей суммы в модальном окне
  const renderModalTotal = () => {
    if (discount.value > 100) discount.value = 100;
    const result = calcDiscount(price.value, count.value, discount.value);
    total.textContent = result;
  };

  // калькуляция значений при расчёте стоимости товара
  const getModalTotal = (price, count) => {
    if (price === '') total.textContent = '0';
    if (!(count === '' && price === '')) {
      if (count === '') {
        count = 1;
      }
      renderModalTotal();
    }
  };

  // получение информации от полей, количество и цена в модальном окне
  form.addEventListener('input', ({target}) => {
    if (target.closest('.modal__input-price') ||
    target.closest('.modal__input-count')) {
      getModalTotal(price.value, count.value);
    }

    // загрузка изображения в preview
    if (target.closest('.modal__add-file')) {
      if (file.files.length > 0) {
        if (file.files[0].size <= 1000000) {
          inputWrapper.classList.remove('error');
          const src = URL.createObjectURL(file.files[0]);
          previewWrapper.style.display = 'block';
          preview.src = src;
        }
        if (file.files[0].size > 1000000) {
          inputWrapper.classList.add('error');
        }
      }
    }
  });

  // удаление загруженного изображения
  document.addEventListener('click', ({target}) => {
    if (target.closest('.modal__preview-remove')) {
      previewWrapper.style.display = 'none';
    }
  });

  // переключение чекбокса для  поля Дисконт
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      discount.disabled = 0;
    } else {
      discount.value = '';
      discount.disabled = 1;
      renderModalTotal();
    }
  });

  discount.addEventListener('input', () => {
    renderModalTotal();
  });

  // получение данных для валидации инпутов
  form.addEventListener('input', ({target}) => {
    if (target === title) checkValidInput(title);
    if (target === category) checkValidInput(category);
    if (target === textarea) checkValidInput(textarea);
    if (target === units) checkValidInput(units, 'letters');
    if (target === count) checkValidInput(count, 'numbers');
    if (target === price) checkValidInput(price, 'numbers');
    if (target === discount) checkValidInput(discount, 'numbers', true);
  });

  // загрузка данных редактируемого продукта с сервера в модальное окно
  const getEditProduct = async () => {
    const editProduct = await fetchRequest(null, {getDataError, id});
    title.value = editProduct.title;
    category.value = editProduct.category;
    units.value = editProduct.units;
    textarea.value = editProduct.description;
    price.value = editProduct.price;
    count.value = editProduct.count;
    const totalProduct = calcDiscount(editProduct.price, editProduct.count, editProduct.discount);
    total.textContent = totalProduct;

    if (editProduct.discount > 0) {
      discount.value = editProduct.discount;
    }

    if (editProduct.image !== 'image/notimage.jpg') {
      previewWrapper.style.display = 'block';
      preview.src = `${URLImage}${editProduct.image}`;
    }

    return totalProduct;
  };
  // сохранение цены до редактирования
  if (id) {
    counter.amountSaved = await getEditProduct();
  }

  // добавление товара через форму
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRow = Object.fromEntries(formData);
    newRow.image = await toBase64(newRow.image);
    const responseStatus = async () => {
      const resultResponseStatus = (id) ? await editProductServer(newRow, id, editTr) :
      await uploadProductServer(newRow);
      if (resultResponseStatus) overlay.remove();
    };
    responseStatus();
    form.reset();
  });
};


