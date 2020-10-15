import React from 'react';
import formatter from './price-formatter';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {

    fetch(`/api/products/${this.props.viewParams.productId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.product === null) {
      return null;
    }
    return (
      <>
        <div className="container col-lg-10">
          <div className="back-to-catalog p-1 text-center align-items-start col-6 col-md-2" onClick={() => this.props.setView('catalog', {})}>Back to Catalog</div>
          <div className="row product-image-row bg-white">
            <div className="product-image-box col">
              <img className="product-image" src={this.state.product.image} alt="Image of product" />

            </div>

            <div className="product-short-detail-box col-md-6">
              <p className="product-detail-title">{this.state.product.name}</p>
              <p className="product-price text-secondary">{`${formatter.format(this.state.product.price / 100)}`}</p>
              <p className="product-short-description mb-5">{this.state.product.shortDescription}</p>
              <button onClick={() => this.props.addToCart(this.state.product)} className="add-to-btn py-3 px-4">Add to Cart</button>
            </div>
          </div>

          <p className="row product-long-description bg-white">{this.state.product.longDescription}</p>

        </div>
      </>
    );
  }
}

export default ProductDetails;
