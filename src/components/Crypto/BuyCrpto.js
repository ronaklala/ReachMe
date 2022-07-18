import React, {useEffect, useState} from 'react';
import FooterSection from '../FooterSection';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import '../sass/globals.scss';

const BuyCrpto = () => {
  document.title = 'JinX: Buy Crypto';
  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  return (
    <>
      <Header />
      <section className="wrapper">
        <section className="container">
          <Sidebar
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
          <MobileMenu />
          <center className="crypto-center">
            <iframe
              src="https://widget.onramper.com/?color=000&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0&darkMode=false&defaultCrypto=ETH&defaultFiat=USD&defaultAmount=100"
              height="660px"
              className="crypto"
              title="JinX Crypto Office"
              frameborder="0"
              allow="accelerometer;
        autoplay; camera; gyroscope; payment"
              style={{
                boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)',
                borderRadius: '20px',
              }}>
              <a href="https://widget.onramper.com" target="_blank">
                Buy crypto
              </a>
            </iframe>
          </center>
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default BuyCrpto;
