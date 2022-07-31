/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {css} from '@emotion/react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SyncLoader} from 'react-spinners';
import Header from '../Header';
import Sidebar from '../Sidebar';
import MobileMenu from '../MobileMenu';
import FooterSection from '../FooterSection';
const UserSearch = () => {
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
    await axios
      .get('https://jinx-social.herokuapp.com/search')
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [posts, setPosts] = useState({});
  const getpost = async () => {
    await axios.get('https://jinx-social.herokuapp.com/posts').then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };

  const [user1, setUser] = useState({});
  useEffect(() => {
    document.title = 'Search - ' + search.search;
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
          <MobileMenu />
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
                  <center style={{width: '100%', marginTop: '20px'}}>
                    <img
                      src="https://res.cloudinary.com/ronaklala-games/image/upload/v1657799759/posts/Untitled_design_1_lfhe7e.gif"
                      height={250}
                      alt="User Img"
                    />
                    <h1 style={{color: '#fff', fontSize: '36px'}}>
                      No User Found
                    </h1>
                  </center>
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
                          <a href={'/' + data.wallet}>
                            <button>View Profile</button>
                          </a>
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
      <FooterSection />
    </>
  );
};

export default UserSearch;
