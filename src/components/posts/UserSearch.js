import {css} from '@emotion/react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SyncLoader} from 'react-spinners';
import Header from '../Header';
import Sidebar from '../Sidebar';
const UserSearch = () => {
  var count;
  const search = useParams();
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const [loading, setLoading] = useState(true);
  var [user, setuser] = useState({});
  var [serach1, onsearch1] = useState({});
  // var data2= {};
  const getuser = async () => {
    console.log(search.search);
    await axios
      .get('http://localhost:5001/search')
      .then((res) => {
        setuser(res.data);
        onsearch1(
          res.data.filter((user) =>
            user.username
              .toString()
              .toLowerCase()
              .includes(search.search.toString().toLowerCase())
          )
        );
        console.log(serach1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [posts, setPosts] = useState({});
  const getpost = async () => {
    await axios.get('http://localhost:5001/posts').then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };

  function post_count(username1, count) {
    posts.map((username) => {
      if (username.username === username1) {
        count = count + 1;
      }
    });
    return count;
  }

  const [user1, setUser] = useState({});
  useEffect(() => {
    getpost();
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }
    getuser();
  }, []);

  return (
    <>
      <Header />
      <section className="wrapper">
        <section className="container">
          <Sidebar
            username={user1.username}
            wallet={user1.wallet}
            profile_url={user1.profile_url}
          />
          {loading == true ? (
            <>
              <center>
                <SyncLoader
                  color="#ffffff"
                  loading={loading}
                  css={override}
                  size={50}
                />
                <br />
                <h2>Loading Users Data Please be patient......</h2>
              </center>
            </>
          ) : (
            <>
              {Object.keys(serach1).length == 0 ? (
                <>
                  <h1 style={{color: '#fff'}}>No User Found</h1>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                    }}>
                    {Object.values(serach1).map((data) => (
                      <section className="profile" key={data._id}>
                        <div className="profile-image">
                          <label htmlFor="btn-upload">
                            {data.profile_url === null ? (
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="profile_image"
                                id="user_image"
                              />
                            ) : (
                              <img
                                src={data.profile_url}
                                alt="profile_image"
                                id="user_image"
                              />
                            )}
                          </label>
                        </div>
                        <div className="profile-info">
                          <span>{data.username}</span>
                          <span>{data.wallet}</span>
                          <span>User ID :- {data._id}</span>
                          <span>Total Followers :- </span>
                          <span>
                            Number of Posts :-&nbsp;
                            {post_count(data.username, (count = 0))}
                          </span>
                        </div>
                      </section>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default UserSearch;
