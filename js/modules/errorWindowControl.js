import {modalOverlay as overlay} from './var.js';

export const errorWindowControl = (windowError, modal) => {
  windowError.classList.add('window-error-on');

  const closeError = () => {
    windowError.classList.remove('window-error-on');
  };

  overlay.addEventListener('click', (e) => {
    const target = e.target;

    if (target === overlay || modal ||
        target.closest('.window-error__btn-error')) {
      closeError();
    }
  });
};
