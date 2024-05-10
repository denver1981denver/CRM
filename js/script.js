import {renderGoods} from './modules/render.js';
import {fetchRequest} from './modules/goods.js';
import goodsControl from './modules/goodsControl.js';
import modalControl from './modules/modalControl.js';
import {formControl} from './modules/formControl.js';

const init = async () => {
  await fetchRequest(renderGoods);
  goodsControl();
  const closeModal = modalControl();
  formControl(closeModal);
};

window.crmInit = init;


