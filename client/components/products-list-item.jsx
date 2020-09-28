import React from 'react';

function ProductListItem(props) {
  return (
    <>
      <div className="my-card card col-lg-3 my-3 mr-md-5 my-md-5">
        <img className="my-card-img-top card-img-top" src={props.products.image} alt="Image of product" />
        <div className="my-card-body card-body">
          <h5 className="my-card-title card-title">{props.products.name}</h5>
          <p className="price text-secondary">{props.products.price}</p>
          <p className="my-card-text card-text pb-5">{props.products.shortDescription}</p>
        </div>
      </div>
    </>
  );
}

export default ProductListItem;
