// окно с ошибкой
export const errorWindowControl = windowError => {
  const closeError = () => {
    windowError.remove();
  };

  document.body.addEventListener('click', ({target}) => {
    if (target.closest('.overlay') || target.closest('.modal') ||
        target.closest('.window-error__btn-error')) {
      closeError();
    }
  });
};
