import {createModal} from './createElements.js';
import {formControl} from './formControl.js';

// вызов модального окна
const modalControl = categories => {
  document.body.addEventListener('click', async ({target}) => {
    const closeModal = overlay => {
      overlay.remove();
      document.body.classList.remove('body-popap');
    };

    let modalElements;
    
    // вызов окна для добавления нового товара
    if (target.closest('.btn-add-product-cms')) {
      modalElements = await createModal(null, categories);
      formControl(modalElements);

      modalElements.overlay.addEventListener('click', ({target}) => {
        if (target === modalElements.overlay ||
        target.closest('.modal__btn-close')) {
          closeModal(modalElements.overlay);
        }
      });
    }

    // вызов окна для редактирования товара
    if (target.closest('.table__btn-icon-edit')) {
      const editTr = target.closest('tr');
      const id = target.closest('tr').dataset.id;

      modalElements = await createModal(id, categories);
      formControl(modalElements, id, editTr);

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
