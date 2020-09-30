import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.error(err));
  }

  render() {
    let component = null;
    if (this.state.view.name === 'catalog') {
      component = <ProductList setView={this.setView} />;
    } else {
      component = <ProductDetails viewParams={this.state.view.params} setView={this.setView} />;
    }
    return (
      <>
        <Header cartItemCount={this.state.cart.length} />
        <div className="container col-sm-12 col-md-12 my-5">
          <div className="row productList justify-content-center">
            {component}
          </div>
        </div>
      </>
    );

  }
}
