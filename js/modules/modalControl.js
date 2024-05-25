import {createModal} from './createElements.js';
import {formControl} from './formControl.js';

// вызов модального окна
const modalControl = () => {
  document.body.addEventListener('click', async ({target}) => {
    const closeModal = overlay => {
      overlay.remove();
    };

    let modalElements;

    if (target.closest('.btn-add-product-cms')) {
      modalElements = await createModal();
      formControl(modalElements);

      modalElements.overlay.addEventListener('click', ({target}) => {
        if (target === modalElements.overlay ||
      target.closest('.modal__btn-close')) {
          closeModal(modalElements.overlay);
        }
      });
    }

    if (target.closest('.table__btn-icon-edit')) {
      const id = target.closest('tr').dataset.id;

      modalElements = await createModal(id);
      formControl(modalElements, id);

      modalElements.overlay.addEventListener('click', ({target}) => {
        if (target === modalElements.overlay ||
      target.closest('.modal__btn-close')) {
          closeModal(modalElements.overlay);
        }
      });
    }
  });
};

export default modalControl;
