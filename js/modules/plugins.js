// рассчёт дисконтной скидки
export const calcDiscount = (price, count, discount) => {
  const sum = price * count;

  return +(sum - ((sum / 100) * discount)).toFixed(2);
};

// валидация инпутов
export const checkValidInput = (dataInput, checkUnit) => {
  const inputValid = /[^А-Я\s]/ig;
  const unitValid = /[^А-Я]/ig;
  const numberValid = /\D/g;

  let regexp = inputValid;
  if (checkUnit === 'letters') regexp = unitValid;
  if (checkUnit === 'numbers') regexp = numberValid;

  dataInput.value = dataInput.value.replace(regexp, '');
};

// преобразование изображений в base64
export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});


