import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content mx-6">
        <div className="level">
          <div className="level-left">
            <p className="footer-title is-size-4">DISCOVER.LY</p>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
