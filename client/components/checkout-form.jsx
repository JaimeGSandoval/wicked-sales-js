import React from 'react';
import formatter from './price-formatter';
function TotalPrice(props) {
  let total = 0;
  for (let i = 0; i < props.cart.length; i++) {
    total += props.cart[i].price;
  }
  return formatter.format(total / 100);
}

// onClick = {() => props.setView('checkout', {})}
// onClick = {() => props.setView('catalog', {})}
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  render() {
    return (
      <>
        <div className="row mb-3 flex-column">
          <h1>My Cart</h1>
          <h2 className="mt-3 text-secondary">
            <span>Order Total: <TotalPrice cart={this.props.cartItems} className="d-inline" /> </span>
          </h2>
        </div>

        {/* { cartItems} */}
        <div className="row my-5 col-12">
          <div className="container d-flex justify-content-between">
            <div className="back-to-catalog py-2 px-3 mb-5 align-middle text-center border border-secondary">
              <i className="fas fa-chevron-left mr-2"></i>
              <a>Continue Shopping</a>
            </div>
            <div className="pr-0">
              <button className="order-btn btn-primary">Place Order</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CheckoutForm;
