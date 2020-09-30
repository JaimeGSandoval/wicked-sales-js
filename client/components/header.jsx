import React from 'react';

function Header(props) {

  return (
    <header className="header bg-secondary d-flex" >
      <div className="container col-sm-12 col-md-10">
        <i className="header-dollar-sign text-white fas fa-dollar-sign mr-2"></i>
        <p className="py-3 text-white">Wicked Sales</p>
      </div>
    </header>
  );

}

export default Header;
