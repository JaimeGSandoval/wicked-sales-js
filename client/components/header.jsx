import React from 'react';

function Header(props) {

  return (
    <header className="header">
      <div className="col-sm-12 col-md-10 m-auto d-flex align-items-center">
        <img className="bonsai-icon bg-white" src="images/bonsai-icon.png" />
        <a className="py-3 text-white nav-title ml-2 text-decoration-none pointer">Bonsai Depot</a>
        <div className="cart-box d-inline-block ml-auto px-5 py-4 checkout-cart">
          <span className="cart text-white pr-3">{`${props.cartItemCount} Items`}</span>
          <i className="fas fa-shopping-cart text-white" onClick={() => props.setView('cart', {})}></i>
        </div>
      </div>
    </header >
  );

}

export default Header;
