import React from 'react';
import LogoColouredSmall from '../assets/logos/logo-coloured.png';

const Navbar = () => {
  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <a className="navbar-item" href="/home">
          <img
            src={LogoColouredSmall}
            alt="Small Discover.ly Logo"
            width="30"
            height="100"
          />
        </a>
        <div
          className="navbar-burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a className="navbar-item" href="/aboutus">
                  <span>About Us</span>
                </a>
              </p>
              <p className="control">
                <a className="button is-success " href="/signup">
                  <span>Sign Up</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
