import {search, tBody} from './var.js';
import fetchRequest from './fetchRequest.js';
import {renderGoods} from './render.js';
import {checkValidInput} from './plugins.js';

export const searchControl = () => {
  let searchTimeout;

  search.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    checkValidInput(search);
    searchTimeout = setTimeout(() => {
      tBody.textContent = '';
      fetchRequest(renderGoods, {data: 'search', dataSearch: search.value});
    }, 300);
  });
};


