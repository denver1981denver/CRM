const URL = 'https://sable-rocky-centipede.glitch.me/api/goods';
const headers = {
  'Content-Type': 'application/json',
};
const tBody = document.querySelector('.table__body');
const tableTotal = document.querySelector('.total-cost__price-table');
const screenWidth = screen.width;
const screenHeight = screen.height;
const inputValid = /[^А-Я\s]/ig;
const unitValid = /[^А-Я]/ig;
const styles = new Map();
const totalAmount = {
  count: 0,
};

export {
  URL,
  headers,
  tableTotal,
  tBody,
  totalAmount,
  screenWidth,
  screenHeight,
  styles,
  inputValid,
  unitValid,
};
