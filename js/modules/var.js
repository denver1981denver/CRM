const URL = 'https://sable-rocky-centipede.glitch.me/api/goods';
const headers = {
  'Content-Type': 'application/json',
};
const tBody = document.querySelector('.table__body');
const tableTotal = document.querySelector('.total-cost__price-table');
const screenWidth = screen.width;
const screenHeight = screen.height;
const totalAmount = {
  count: 0,
};
const styles = new Map();

export {
  URL,
  headers,
  tableTotal,
  tBody,
  totalAmount,
  screenWidth,
  screenHeight,
  styles,
};
