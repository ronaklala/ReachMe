import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import './sass/sidebar.scss';
import HomePage from './HomePage';

const Main = () => {
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
      <section className="wrapper">
        <section className="container">
          <Sidebar username={user.username} wallet={user.wallet} />
          <HomePage
            username={user.username}
            wallet={user.wallet}
            email={user.email}
          />
        </section>
      </section>
    </>
  );
};

export default Main;
