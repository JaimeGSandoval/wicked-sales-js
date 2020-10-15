import React from 'react';
import formatter from './price-formatter';

function CartSummaryItem(props) {
  const price = `${formatter.format(props.price / 100)}`;

  return (
    <div className="row border mb-4 bg-white p-3">
      <div className="col-5">
        <img className="cart-summary-img product-image" src={props.image} alt={props.name} />
      </div>
      <div className="d-flex flex-column col justify-content-center ml-2">
        <h2 className="mb-3 cart-title">{props.name}</h2>
        <h4 className="text-secondary font-weight-bold checkout-price mb-4 mt-3">{price}</h4>
        <p className="cart-short-description">{props.shortDesc}</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
