import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../sass/sidebar.scss';
import CreatePostForm from './CreatePostForm';
import MobileMenu from '../MobileMenu';
import FooterSection from '../FooterSection';

const CreatePost = () => {
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
          <CreatePostForm username={user.username} wallet={user.wallet} />
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default CreatePost;
