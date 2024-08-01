const URL = 'https://sable-rocky-centipede.glitch.me/api/goods';
const URLCategory = 'https://sable-rocky-centipede.glitch.me/api/categories';
const URLImage = 'https://sable-rocky-centipede.glitch.me/';
const URLSearch = 'https://sable-rocky-centipede.glitch.me/api/goods?page=1&search=';
const headers = {
  'Content-Type': 'application/json',
};
const search = document.querySelector('.menu__form-search');
const tBody = document.querySelector('.table__body');
const tableTotal = document.querySelector('.total-cost__price-table');
const screenWidth = screen.width;
const screenHeight = screen.height;

const styles = new Map();
const globalCounter = {
  totalAmountGoods: 0,
  amountSaved: 0,
};

export {
  URL,
  URLCategory,
  URLImage,
  URLSearch,
  headers,
  tableTotal,
  tBody,
  search,
  screenWidth,
  screenHeight,
  styles,
  globalCounter,
};
