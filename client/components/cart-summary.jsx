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
        <div className="back-to-catalog p-1 pb-2 mb-5 align-middle text-center custom-catalog-width ml-5" onClick={() => props.setView('catalog', {})}>
          <i className="fas fa-chevron-left mr-2"></i>
          <a>Back to catalog</a>
        </div>
        <div className=" text-center">

        </div>
        <h1 className="mt-4 m-auto position-relative no-items-text text-white" >No items have been added to the cart.</h1 >;

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
        <div className="col my-4">
          <div className="back-to-catalog p-1 pb-2 mb-5 align-middle text-center col-6 col-md-2" onClick={() => props.setView('catalog', {})}>
            <i className="fas fa-chevron-left mr-2"></i>
            <a>Back to catalog</a>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <h1 className="col text-white">My Cart</h1>
      </div>
      { cartItems}
      <div className="row my-5">
        <h2 className="col-6 pl-0 text-white checkout-price">
          Total Price:
          <span className="ml-3">
            <div>
              <TotalPrice cart={props.cartItems} />
            </div>
          </span>
        </h2>
        <div className="col-6 d-flex justify-content-end pr-0 align-items-center">
          <button className="btn btn-lg checkout-button py-3 px-4" onClick={() => { props.setView('checkout', {}); }}>Checkout</button>
        </div>
      </div>
    </div >
  );
}

export default CartSummary;
