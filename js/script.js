import {renderGoods} from './modules/render.js';
import deleteControl from './modules/deleteControl.js';
import modalControl from './modules/modalControl.js';
import {formControl} from './modules/formControl.js';

const init = () => {
  renderGoods();
  deleteControl();
  const closeModal = modalControl();
  formControl(closeModal);
};

window.crmInit = init;


