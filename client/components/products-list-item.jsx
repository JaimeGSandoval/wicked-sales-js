import React from 'react';

function ProductListItem() {
  return (
    <div className="card" style="width:200px;">
      <img className="card-img-top" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default ProductListItem;
