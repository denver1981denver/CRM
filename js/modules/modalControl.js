import {btnAddProduct as btn, modalOverlay as overlay} from './var.js';

// вызов модального окна
const modalControl = () => {
  btn.addEventListener('click', () => {
    overlay.classList.add('overlay-on');
  });

  // функция закрытия модального окна
  const closeModal = () => {
    overlay.classList.remove('overlay-on');
  };

  // реализация закрытия модального окна
  overlay.addEventListener('click', (e) => {
    const target = e.target;

    if (target === overlay ||
      target.closest('.modal__btn-close')) {
      closeModal();
    }
  });

  return closeModal;
};

export default modalControl;
