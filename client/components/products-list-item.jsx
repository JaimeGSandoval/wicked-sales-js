import React from 'react';
import formatter from './price-formatter';

function ProductListItem(props) {
  return (
    <>
      <div className="my-card card col-lg-3 my-3 mr-md-5 my-md-5" onClick={() => props.setView('details', { productId: props.product.productId })}>
        <img className="my-card-img-top card-img-top" src={props.product.image} alt="Image of product" />
        <div className="my-card-body card-body">
          <h5 className="my-card-title card-title">{props.product.name}</h5>
          <p className="price text-secondary">{`${formatter.format(props.product.price / 100)}`}</p>
          <p className="my-card-text card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </>
  );
}

export default ProductListItem;
