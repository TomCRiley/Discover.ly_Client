import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoColouredSmall from '../assets/logos/logo-coloured.png';
import { getLoggedInUserId } from '../lib/auth.js';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const [openBurger, setOpenBurger] = React.useState(false);

  const toggleBurgerMenu = () => {
    setOpenBurger(!openBurger);
  };

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div>
          <a className="navbar-item" href="/">
            <img
              src={LogoColouredSmall}
              alt="Small Discover.ly Logo"
              width="30"
              height="100"
            />
          </a>
        </div>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          href="#"
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={openBurger ? 'navbar-menu is-active' : 'navbar-menu'}>
        <div className="navbar-end">
          {getLoggedInUserId() && (
            <Link to={'/add'} className="navbar-item">
              Add New Spot
            </Link>
          )}
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <Link className="navbar-item" to="/aboutus">
                  <span>About Us</span>
                </Link>
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
                  <Link className="button is-success is-outlined " to="/login">
                    <span>Log In</span>
                  </Link>
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
