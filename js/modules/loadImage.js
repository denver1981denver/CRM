import {tBody, screenWidth, screenHeight} from './var.js';

// функция вызова нового окна с изображением
const getImg = url => {
  const width = (screenWidth - 600) / 2;
  const height = ((screenHeight - 600) / 2);
  const param = `width=600, height=600, left=${width}, top=${height}`;

  open(url, '', param);
};

// загрузка изображения
export const imageControl = () => {
  tBody.addEventListener('click', ({target}) => {
    if (target.closest('.table__btn-icon-img')) {
      const url = target.closest('tr').dataset.pic;
      getImg(url);
    }
  });
};

