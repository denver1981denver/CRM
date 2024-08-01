import fetchRequest from './fetchRequest.js';
import {getDataError, renderTableTotal, recalcTotal} from './render.js';
import {URLImage, globalCounter as counter} from './var.js';
import {calcDiscount} from './plugins.js';

// редактирование товара в таблице
const editProductTable = (err, data, editTr) => {
  if (err) {
    console.warn(err);
    return;
  }
  editTr.tdTitle.textContent = data.title;
  editTr.tdCategory.textContent = data.category;
  editTr.tdUnits.textContent = data.units;
  editTr.tdCount.textContent = data.count;
  editTr.tdPrice.textContent = data.price;

  const total = calcDiscount(data.price, data.count, data.discount);
  editTr.tdTotal.textContent = total;

  if (counter.amountSaved > total) recalcTotal(counter.amountSaved - total);
  if (counter.amountSaved < total) recalcTotal(total - counter.amountSaved, true);

  editTr.dataset.pic = `${URLImage}${data.image}`;

  if (data.image !== 'image/notimage.jpg') editTr.btnImage.style.display = 'inline-block';
  if (data.image === 'image/notimage.jpg') editTr.btnImage.style.display = 'none';
};

// редактирование товара на сервере
const editProductServer = async (newRow, id, editTr) => {
  const responseStatusEdit = await fetchRequest(null, {getDataError, id, method: 'PATCH', body: newRow});
  if (responseStatusEdit) {
    const responseStatus = await fetchRequest(editProductTable, {getDataError, id, data: editTr});
    if (responseStatus) {
      fetchRequest(renderTableTotal, {data: 'total'});
      
      return responseStatus;
    }
  }
};

export default editProductServer;
