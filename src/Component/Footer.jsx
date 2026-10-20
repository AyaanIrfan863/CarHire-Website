import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Top Row */}
        <div className="footer-top">

          {/* Brand Block */}
          <div className="brand-block">
            <div className="brand">
              <div className="brand-logo">H</div>
              <div className="brand-name">HIRE</div>
            </div>
            <p className="tagline">Drive Your Dreams.</p>

            <div className="socials">
              {/* Facebook */}
              <a href="#" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2c2.76 0 3.1.01 4.2.06 1.1.05 1.86.23 2.52.48.68.26 1.26.62 1.84 1.2.58.58.94 1.16 1.2 1.84.25.66.43 1.42.48 2.52.05 1.1.06 1.44.06 4.2s-.01 3.1-.06 4.2c-.05 1.1-.23 1.86-.48 2.52-.26.68-.62 1.26-1.2 1.84-.58.58-1.16.94-1.84 1.2-.66.25-1.42.43-2.52.48-1.1.05-1.44.06-4.2.06s-3.1-.01-4.2-.06c-1.1-.05-1.86-.23-2.52-.48a4.9 4.9 0 0 1-1.84-1.2 4.9 4.9 0 0 1-1.2-1.84c-.25-.66-.43-1.42-.48-2.52C2.01 15.1 2 14.76 2 12s.01-3.1.06-4.2c.05-1.1.23-1.86.48-2.52.26-.68.62-1.26 1.2-1.84.58-.58 1.16-.94 1.84-1.2.66-.25 1.42-.43 2.52-.48C8.9 2.01 9.24 2 12 2Zm0 1.8c-2.7 0-3.02.01-4.08.06-.99.05-1.53.21-1.89.35-.48.18-.81.4-1.17.76-.36.36-.58.69-.76 1.17-.14.36-.3.9-.35 1.89-.05 1.06-.06 1.38-.06 4.08s.01 3.02.06 4.08c.05.99.21 1.53.35 1.89.18.48.4.81.76 1.17.36.36.69.58 1.17.76.36.14.9.3 1.89.35 1.06.05 1.38.06 4.08.06s3.02-.01 4.08-.06c.99-.05 1.53-.21 1.89-.35.48-.18.81-.4 1.17-.76.36-.36.58-.69.76-1.17.14-.36.3-.9.35-1.89.05-1.06.06-1.38.06-4.08s-.01-3.02-.06-4.08c-.05-.99-.21-1.53-.35-1.89a3.2 3.2 0 0 0-.76-1.17 3.2 3.2 0 0 0-1.17-.76c-.36-.14-.9-.3-1.89-.35-1.06-.05-1.38-.06-4.08-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 8.48a3.34 3.34 0 1 0 0-6.68 3.34 3.34 0 0 0 0 6.68Zm6.54-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24">
                  <path d="M23.5 7.2a3 3 0 0 0-2.12-2.13C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.38.52A3 3 0 0 0 .5 7.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 4.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13c.34-1.58.5-3.17.5-4.8a31.4 31.4 0 0 0-.5-4.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a href="#" className="social-link" aria-label="X">
                <svg viewBox="0 0 24 24">
                  <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.81-5.96 6.81H1.69l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.04H5.05l12.03 15.73Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Block */}
          <div className="nav-block">
            <ul className="nav-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">Models</a></li>
              <li><a href="#">About</a></li>
            
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Row */}
        <div className="footer-bottom">
          <p className="copyright">© 2025 CAR HIRE. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
