
// создание строки для таблицы
const createRow = (data) => {
  const tr = document.createElement('tr');
  const {
    id,
    title,
    category,
    units,
    count,
    price,
  } = data;
  const total = count * price;
  tr.dataset.rowID = id;
  tr.insertAdjacentHTML('beforeend', `
      <td class="table__id">${id}</td>
      <td>${title}</td>
      <td>${category}</td>
      <td class="table__units">${units}</td>
      <td class="table__quantity">${count}</td>
      <td class="table__price">${price}</td>
      <td class="table__total">${total}</td>
      <td class="table__icon">
        <button class="table__btn-icon" type="button">
          <svg width="20" height="20">
            <use xlink:href="#image"/>
          </svg>
        </button>

        <button class="table__btn-icon" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path class="stroke" d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 2.8636 16.8982 3.03233V3.03233Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="stroke" d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>                
          </svg>
        </button>

        <button class="table__btn-icon table__btn-icon-delete" type="button">
          <svg width="20" height="20">
            <use xlink:href="#cart"/>
          </svg>
        </button>
      </td>
      `);

  return tr;
};
export default createRow;
