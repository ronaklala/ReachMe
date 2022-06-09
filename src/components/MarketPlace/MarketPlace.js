import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import AddNFT from './AddNFT';
import Market from './Market';

const MarketPlace = () => {
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
          <Market
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
        </section>
      </section>
    </>
  );
};

export default MarketPlace;
