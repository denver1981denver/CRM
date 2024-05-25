import {renderGoods} from './modules/render.js';
import fetchRequest from './modules/goods.js';
import goodsControl from './modules/goodsControl.js';
import modalControl from './modules/modalControl.js';

const init = async () => {
  await fetchRequest(renderGoods);
  goodsControl();
  modalControl();
};

window.crmInit = init;


