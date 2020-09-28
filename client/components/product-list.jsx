import React from 'react';
import ProductListItem from './products-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(error => console.error('Error retrieving products data', error));
  }

  render() {
    return (
      this.state.products.map(product => {
        return (
          <ProductListItem key={product.productId} products={product} />
        );
      })
    );
  }
}

export default ProductList;
