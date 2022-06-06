import React, {useEffect, useState} from 'react';
import Header from '../Header';
import '../sass/sidebar.scss';
import Sidebar from '../Sidebar';
import Posts from './Posts';

const ViewPosts = () => {
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
          <Sidebar username={user.username} wallet={user.wallet} />
          <Posts />
        </section>
      </section>
    </>
  );
};

export default ViewPosts;
