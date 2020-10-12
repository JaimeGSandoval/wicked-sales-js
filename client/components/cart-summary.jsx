import React from 'react';
import CartSummaryItem from './cart-summary-item';
import formatter from './price-formatter';
function TotalPrice(props) {
  let total = 0;
  for (let i = 0; i < props.cart.length; i++) {
    total += props.cart[i].price;
  }
  return formatter.format(total / 100);
}

function CartSummary(props) {

  const cartItems = props.cartItems.map(cartItem =>

    <CartSummaryItem
      key={cartItem.cartItemId}
      cartItemId={cartItem.cartItemId}
      price={cartItem.price}
      productId={cartItem.productId}
      image={cartItem.image}
      name={cartItem.name}
      shortDesc={cartItem.shortDescription}
    />
  );
  return (
    < div className="container" >
      <div className="row">
        <div className="col my-4">
          <div className="back-arrow" onClick={() => props.setView('catalog', {})}>
            <i className="fas fa-chevron-left mr-2"></i>
            <a>Back to catalog</a>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <h1 className="col">My Cart</h1>
      </div>
      { cartItems}
      <div className="row my-5">
        <h2 className="col-6 pl-0">
          Total Price:
          <span className="ml-3">
            <TotalPrice cart={props.cartItems} />
          </span>
        </h2>
        <div className="col-6 d-flex justify-content-end pr-0">
          <button className="btn btn-lg btn-primary" onClick={() => props.setView('checkout', {})}>Checkout</button>
        </div>
      </div>
    </div >
  );
}
export default CartSummary;
