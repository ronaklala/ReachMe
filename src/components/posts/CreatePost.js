import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../sass/sidebar.scss';
import CreatePostForm from './CreatePostForm';

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
          <Sidebar username={user.username} wallet={user.wallet} />
          <CreatePostForm username={user.username} wallet={user.wallet} />
        </section>
      </section>
    </>
  );
};

export default CreatePost;
