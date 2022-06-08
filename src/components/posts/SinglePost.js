import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import '../sass/sidebar.scss';
import ShowSinglePost from './ShowSinglePost';
import Comment from './../Comment';
import Comments from './../Comments/Comments'

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
          <ShowSinglePost
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
        </section>
      </section>
      <Comments />
      <Comment />
    </>
  );
};

export default SinglePost;
