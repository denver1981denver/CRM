import {renderGoods} from './modules/render.js';
import fetchRequest from './modules/fetchRequest.js';
import deleteControl from './modules/deleteControl.js';
import modalControl from './modules/modalControl.js';
import {searchControl} from './modules/search.js';
import {imageControl} from './modules/loadImage.js';

const init = async () => {
  await fetchRequest(renderGoods, {});
  const categories = await fetchRequest(null, {data: 'categories'});
  deleteControl();
  modalControl(categories);
  imageControl();
  searchControl();
};

window.crmInit = init;


