import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoColouredSmall from '../assets/logos/logo-coloured.png';
import { getLoggedInUserId } from '../lib/auth.js';

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };
  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
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
                {getLoggedInUserId() ? (
                  <button
                    className="button is-success is-outlined"
                    onClick={logOut}
                  >
                    Log Out
                  </button>
                ) : (
                  <a className="button is-success is-outlined " href="/login">
                    <span>Log In</span>
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
