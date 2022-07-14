import {Facebook, Instagram, Twitter} from '@mui/icons-material';
import {DiscordLogo} from 'phosphor-react';
import React from 'react';
import footer_logo from './images/F.png';

const FooterSection = () => {
  return (
    <>
      <section className="footer">
        <div className="fsection">
          <img src={footer_logo} alt="footer logo" />
          <div>
            <b>{process.env.REACT_APP_NAME}</b>
            <ul>
              <a href="/about">
                <li>About </li>
              </a>
              <a href="/contact">
                <li>Contact Us</li>
              </a>
              <a href="/docs">
                <li>Documentation</li>
              </a>
            </ul>
          </div>
          <div>
            <b>Join Us @</b>

            <ul className="socials">
              <li>
                <Facebook />
              </li>
              <li>
                <DiscordLogo size={24} />
              </li>
              <li>
                <Instagram />
              </li>
              <li>
                <Twitter />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterSection;
