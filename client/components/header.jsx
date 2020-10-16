import React from 'react';

function Header(props) {

  return (
    <header className="header">
      <div className="col-sm-12 col-md-10 m-auto d-flex align-items-center">
        <img className="bonsai-icon bg-white" src="images/bonsai-icon.png" />
        <p onClick={() => props.setView('catalog', {})} className="py-3 text-white nav-title ml-2 text-decoration-none pointer" >Bonsai Depot</p>
        <div className="cart-box d-inline-block ml-auto py-4 checkout-cart" onClick={() => props.setView('cart', {})}>
          <span className="cart pr-3">{`${props.cartItemCount} Items`}</span>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
    </header >
  );

}

export default Header;
