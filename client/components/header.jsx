import React from 'react';

function Header(props) {

  return (
    <header className="header">
      <div className="col-sm-12 col-md-10 m-auto d-flex align-items-center">
        <img className="bonsai-icon bg-white" src="images/bonsai-icon.png" />
        <p className="py-4 text-white nav-title ml-2">Bonsai Depot</p>
        <div className="cart-box d-inline-block ml-auto pr-5">
          <span className="cart text-white pr-3">{`${props.cartItemCount} Items`}</span>
          <i className="fas fa-shopping-cart text-white" onClick={() => props.setView('cart', {})}></i>
        </div>
      </div>
    </header >
  );

}

export default Header;
