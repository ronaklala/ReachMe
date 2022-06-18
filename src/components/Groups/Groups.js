import React, {useEffect, useState} from 'react';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import GroupList from './GroupList';

const Groups = () => {
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
          <GroupList
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
        </section>
      </section>
    </>
  );
};

export default Groups;
