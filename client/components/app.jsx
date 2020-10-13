import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(cartData => {
        this.setState({ cart: cartData });
      })
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };

    fetch('/api/cart', req)
      .then(response => response.json())
      .then(cartItem => {
        this.setState({ cart: this.state.cart.concat(cartItem) });
      })
      .catch(err => console.error(err));
  }

  placeOrder(order) {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };

    fetch('/api/orders', req)
      .then(response => response.json())
      .then(orderData => this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {}
        }
      })
      )
      .catch(err => console.error(err));
  }

  // placeOrder(order) {
  //   fetch('/api/orders', {
  //     method: 'POST',
  //     body: JSON.stringify(order),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => this.setState({
  //       view: { name: 'catalog', params: {} },
  //       cart: []
  //     }))
  //     .catch(err => console.error(err));
  // }

  render() {
    let component = null;

    if (this.state.view.name === 'catalog') {
      component = <ProductList setView={this.setView} />;
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className="container col-sm-12 col-md-12 my-5">
            <div className="row productList justify-content-center">
              {component}
            </div>
          </div>
        </>
      );

    } else if (this.state.view.name === 'details') {
      component = <ProductDetails addToCart={this.addToCart} viewParams={this.state.view.params} setView={this.setView} />;
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />,
          <div className="container col-sm-12 col-md-12 my-5">
            <div className="row productList justify-content-center">
              {component}
            </div>
          </div>;
        </>
      );

    } else if (this.state.view.name === 'cart') {
      component = <CartSummary cartItems={this.state.cart} setView={this.setView} />;
      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className="container col-sm-12 col-md-12 my-5">
            <div className="row productList justify-content-start ml-4">
              {component}
            </div>
          </div>
        </>
      );
    } else if (this.state.view.name === 'checkout') {

      component = <CheckoutForm setView={this.setView} cartItems={this.state.cart} placeOrder={this.placeOrder} />;

      return (
        <>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <div className="container col-10 my-5">
            <div className="row">
              {component}
            </div>
          </div>
        </>
      );
    }
  }
}
