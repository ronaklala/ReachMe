/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import Self_NFT_Showcase from './Self_NFT_Showcase';

const Showcase = () => {
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
          <Self_NFT_Showcase
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
        </section>
      </section>
    </>
  );
};

export default Showcase;
