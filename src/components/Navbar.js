import React from 'react';
import LogoColouredSmall from '../assets/logos/logo-coloured.png';

const Navbar = () => {
  return (
    <nav class='navbar is-transparent'>
      <div class='navbar-brand'>
        <a class='navbar-item' href='/home'>
          <img
            src={LogoColouredSmall}
            alt='Small Discover.ly Logo'
            width='30'
            height='100'
          />
        </a>
        <div
          class='navbar-burger'
          data-target='navbarExampleTransparentExample'
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class='navbar-menu'>
        <div class='navbar-end'>
          <div class='navbar-item'>
            <div class='field is-grouped'>
              <p class='control'>
                <a class='navbar-item' href='/aboutus'>
                  <span>About Us</span>
                </a>
              </p>
              <p class='control'>
                <a class='button is-success is-outlined ' href='/signup'>
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
