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

  if (props.cartItems.length === 0) {
    return (
      <>
        <div className="text-center mx-auto no-items-text-box">
          <div className="back-to-catalog p-1 pb-2 mb-5 align-middle text-center custom-catalog-width" onClick={() => props.setView('catalog', {})}>
            <i className="fas fa-chevron-left mr-2"></i>
            <a>Back to catalog</a>
          </div>

          <h1 className="position-relative no-items-text" >No items have been added to the cart.</h1 >;
        </div>

      </>
    );
  }

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
    < div className="container">
      <div className="row">
        <div className="col">
          <div className="back-to-catalog-cart-summary  py-3 px-4 align-middle text-center" onClick={() => props.setView('catalog', {})}>
            <i className="fas fa-chevron-left mr-2"></i>
            <a>Back to catalog</a>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <h1 className="col my-cart-text">My Cart</h1>
      </div>
      { cartItems}
      <div className="row my-5 cart-summary-price-box">
        <h2 className="col-6 pl-0 custom-margin-left-price">
          Total Price:
          <span className="ml-3">
            <TotalPrice cart={props.cartItems} />
          </span>
        </h2>
        <div className="col d-flex justify-content-end pr-0 align-items-center">
          <button className="btn btn-lg checkout-button py-3 px-4" onClick={() => { props.setView('checkout', {}); }}>Checkout</button>
        </div>
      </div>
    </div >
  );
}

export default CartSummary;
