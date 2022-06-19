/* eslint-disable jsx-a11y/alt-text */
import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import './users.scss';

const Followers = () => {
  const [user, setUser] = useState({});

  const [followers, setFollowers] = useState([]);

  const [loading, setLoading] = useState(true);
  const uid = useParams();

  const getFollowers = async () => {
    await axios
      .get('http://localhost:5001/followers/' + uid.uid)
      .then((res) => {
        setFollowers(res.data[0].user_details);
        setLoading(false);
      });
  };

  useEffect(() => {
    getFollowers();
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {loading === true ? (
            <>
              <h1>Loading Followers......</h1>
            </>
          ) : (
            <>
              <section className="flex-colmn">
                <h2>{followers.length} Followers</h2>
                <div className="members">
                  <ul>
                    {followers.map((follower, index) => (
                      <>
                        <li>
                          <a href={'/' + follower.wallet}>
                            <div className="admin">
                              {follower.profile_url === null ? (
                                <>
                                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                </>
                              ) : (
                                <>
                                  <Avatar
                                    src={follower.profile_url}
                                    sx={{ width: 100, height: 100 }}
                                  />
                                </>
                              )}
                              <div className="user_info">
                                <span>{follower.username}</span>
                                <span
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '90%',
                                  }}>
                                  {follower.wallet}
                                </span>
                              </div>
                            </div>
                          </a>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default Followers;
