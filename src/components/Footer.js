import React from 'react';

const Footer = () => {
  return (
    <footer className="footer level px-6">
      <div className="level-left">
        <a href="/">
          <p className="level-item styled-title is-size-4 has-text-black">
            {' '}
            DISCOVER.LY
          </p>
        </a>
      </div>
      <div className="level-right">
        <div className="level-item">
          <span>Ash </span>
          <a href="https://github.com/agyngell">
            <span className="icon">
              <i className="fab fa-github"></i>
            </span>
          </a>
        </div>
        <div className="level-item">
          <span>Elise </span>
          <a href="https://github.com/eliselarooy">
            <span className="icon">
              <i className="fab fa-github"></i>
            </span>
          </a>
        </div>
        <div className="level-item">
          <span>Tom </span>
          <a href="https://github.com/tomcriley">
            <span className="icon">
              <i className="fab fa-github"></i>
            </span>
          </a>
        </div>
        <div className="level-item">
          <a href="#top" className="level-item  is-size-6 has-text-black">
            <span>Return to top </span>
            <span className="icon">
              <i className="fa fa-circle-arrow-up "></i>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
