import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">&copy; 2023 Movie Search Website. All rights reserved.</p>
        <p className="footer-text">
          Movie information is provided by third parties and may be subject to change without prior notice.
          We do not guarantee the accuracy or reliability of movie information.
        </p>
        <p className="footer-text">
          Images and videos used on the website belong to their respective owners and are used solely for informational purposes.
        </p>
        <p className="footer-text">
          This website does not provide the ability to stream or download movies. It is solely intended for searching movie information and provides links to official sources.
        </p>
        <p className="footer-text">
          Please note that we cannot control the content of external websites that we link to. We are not responsible for the content or actions taken on these websites.
        </p>
        <p className="footer-text">
          Website designed and maintained by <a href="mailto:bobrovnik807@gmail.com" className="footer-link">Bober@Corporation</a>.
        </p>
      </div>
      <div className='links'>
        <nav>
          <a href="privacy-policy.html" className="footer-link">Privacy Policy</a>
          <a href="terms-of-use.html" className="footer-link">Terms of Use</a>
          <a href="contact.html" className="footer-link">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

