import React from 'react';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

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
        <div className="container">
          <div className="back-to-catalog p-1 pb-2 mb-5 align-middle text-center border border-secondary col-6 col-md-2" onClick={() => this.props.setView('catalog', {})}>Back to Catalog</div>
          <div className="row product-image-row">
            <div className="product-image-box mb-5 col-md-6">
              <img className="product-image" src={this.state.product.image} alt="Image of product" />
            </div>

            <div className="product-short-detail-box col-md-6">
              <p className="product-detail-title">{this.state.product.name}</p>
              <p className="product-price text-secondary">{`${formatter.format(this.state.product.price / 100)}`}</p>
              <p className="product-short-description mb-5">{this.state.product.shortDescription}</p>
            </div>
          </div>

          <div className="row product-long-description px-3">{this.state.product.longDescription}</div>

        </div>
      </>
    );
  }
}

export default ProductDetails;
