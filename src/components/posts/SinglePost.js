import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../sass/sidebar.scss';
import ShowSinglePost from './ShowSinglePost';
import MobileMenu from '../MobileMenu';
import FooterSection from '../FooterSection';

const SinglePost = () => {
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
          <ShowSinglePost
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
            uid={user._id}
          />
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default SinglePost;
