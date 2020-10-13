import React from 'react';

function Header(props) {

  return (
    <header className="header bg-secondary">
      <div className="col-sm-12 col-md-10 m-auto d-flex align-items-center">
        <i className="header-dollar-sign text-white fas fa-dollar-sign mr-2"></i>
        <p className="py-3 text-white">Wicked Sales</p>
        <div className="cart-box d-inline-block ml-auto pr-5">
          <span className="cart text-white pr-3">{`${props.cartItemCount} Items`}</span>
          <i className="fas fa-shopping-cart text-white" onClick={() => props.setView('cart', {})}></i>
        </div>
      </div>
    </header >
  );

}

export default Header;
