import fetchRequest from './fetchRequest.js';
import {tBody} from './var.js';
import {createModalDelete} from './createElements.js';
import {recalcTotal} from './render.js';

// удаление товара на сервере
const removeProduct = async (id, productLine) => {
  const totalDelete = productLine.tdTotal.textContent.slice(1);
  const data = await fetchRequest(null, {id, method: 'DELETE'});
  if (data) recalcTotal(totalDelete);
};

// управление окном удаления
const deleteControl = () => {
  const modalDeleteControl = async (id, productLine) => {
    const {overlay, btnDelete, btnCancel} = await createModalDelete();
    const closeModal = () => overlay.remove();
    btnCancel.addEventListener('click', () => closeModal());

    overlay.addEventListener('click', ({target}) => {
      if (target === overlay) closeModal();
    });

    btnDelete.addEventListener('click', () => {
      closeModal();
      productLine.remove();
      removeProduct(id, productLine);
    });
  };

  // удаление товара в таблице
  tBody.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn-icon-delete')) {
      const id = target.closest('tr').dataset.id;
      const productLine = target.closest('tr');

      modalDeleteControl(id, productLine);
    }
  });
};

export default deleteControl;
