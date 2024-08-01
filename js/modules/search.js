import {search, tBody} from './var.js';
import fetchRequest from './fetchRequest.js';
import {renderGoods} from './render.js';

export const searchControl = () => {
  let searchTimeout;

  search.addEventListener('input', () => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      tBody.textContent = '';
      fetchRequest(renderGoods, {data: 'search', dataSearch: search.value});
    }, 300);
  });
};


