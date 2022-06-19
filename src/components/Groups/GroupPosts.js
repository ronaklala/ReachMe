/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import CreatePostGroup from './CreatePostGroup';
import Posts from './Posts';

const GroupPosts = () => {
  const gid = useParams();
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }

    axios
      .get('http://localhost:5001/group/' + gid.gid + '/posts')
      .then((res) => {
        setGroup(res.data);
        setLoading(false);
      });
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
          <section
            className="groupPosts"
            style={{ display: 'flex', flexDirection: 'column' }}>
            {loading === true ? (
              <>Loading Group Posts</>
            ) : (
              <>
                {group.members.includes(user._id) ? (
                  <CreatePostGroup
                    username={user.username}
                    wallet={user.wallet}
                    profile_url={user.profile_url}
                    uid={user._id}
                  />
                ) : (
                  (window.location.href = '/error')
                )}
                <Posts />
              </>
            )}
          </section>
        </section>
      </section>
    </>
  );
};

export default GroupPosts;
