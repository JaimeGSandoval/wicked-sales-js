import React from 'react';
import formatter from './price-formatter';

function TotalPrice(props) {
  let total = 0;
  for (let i = 0; i < props.cart.length; i++) {
    total += props.cart[i].price;
  }
  return formatter.format(total / 100);
}

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderData = {};
    orderData.name = this.state.name;
    orderData.creditCard = this.state.creditCard;
    orderData.shippingAddress = this.state.shippingAddress;
    this.props.placeOrder(orderData);
  }

  render() {
    return (
      <>
        <div className="row col-12  order-form-top-margin">
          <div className="row flex-column ml-4">
            <h1 className="mb-4">My Cart</h1>
            <h2 className="mb-4">
              <span className="checkout-form-price">Order Total: <TotalPrice cart={this.props.cartItems} className="d-inline" /> </span>
            </h2>
          </div>
          <form className="col-12" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input value={this.state.name} onChange={this.handleChange} type="text" className="form-control form-input" id="name" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="credit-card">Credit Card</label>
              <input value={this.state.creditCard} onChange={this.handleChange} type="text" className="form-control form-input" id="creditCard" required />
            </div>

            <label className="form-label" htmlFor="shipping-address">Shipping Address</label>
            <textarea value={this.state.shippingAddress} onChange={this.handleChange} className="col-12 form-textarea" id="shippingAddress" rows="3" required></textarea>

            <div className="d-flex custom-form-btn-margin position-relative">
              <button type="submit" className="order-btn px-4 py-3">Place Order</button>
            </div>
          </form>

        </div>
        <div className="row col-12">
          <div className="container d-flex justify-content-between">
            <div onClick={() => this.props.setView('catalog', {})} className="back-to-catalog py-3 px-4 mb-5 align-middle text-center custom-catalog-width-checkout">
              <i className="fas fa-chevron-left mr-2"></i>
              <a>Continue Shopping</a>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default CheckoutForm;
