/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {css} from '@emotion/react';
import {SyncLoader} from 'react-spinners';
import {Delete} from '@mui/icons-material';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import {toast} from 'react-toastify';
import FooterSection from '../FooterSection';
import MobileMenu from '../MobileMenu';

const Saved_post = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const username = useParams();
  let [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);
  const [savepost, setsavePosts] = useState([]);

  const uname = useParams();

  const getPosts = async () => {
    await axios
      .get('https://jinx-social.herokuapp.com/saved-post/' + uname.username)
      .then((res) => {
        setsavePosts(res.data.doc);
        setLoading(false);
      });
  };
  useEffect(() => {
    document.title = 'Saved Posts';
    getPosts();
  }, []);
  const deletePost = async (postid) => {
    await axios
      .delete(`https://jinx-social.herokuapp.com/delete-savedpost/${postid}`)
      .then((res) => {
        toast.success('saved Post Deleted Successfully', {
          toastId: 1234 + 111,
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };
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
              <div className="spinner">
                <center>
                  <br />
                  <SyncLoader
                    color="#ffffff"
                    loading={loading}
                    css={override}
                    size={50}
                  />
                  <br />
                  <h2>Loading Posts......</h2>
                </center>
              </div>
            </>
          ) : (
            <>
              <section className="posts">
                <div className="post-parent">
                  {uname.username !== user.username ? (
                    <>{(window.location.href = '/error')}</>
                  ) : (
                    <>
                      {savepost.length === 0 ? (
                        <>
                          <h1>No Saved Posts Found</h1>
                        </>
                      ) : (
                        <>
                          <ul>
                            {savepost.map((post, id) => (
                              <li key={post.postid} id={post.postid}>
                                <div className="post">
                                  <a href={'/post/' + post.postid}>
                                    <img src={post.image} alt={post.image} />
                                  </a>
                                  {/* <h3>{post.tag}</h3> */}
                                  {post.username === user.username ? (
                                    <>
                                      <section className="showcase">
                                        <button
                                          type="submit"
                                          style={{
                                            backgroundColor: '#f00',
                                            width: '50px',
                                          }}
                                          onClick={() => {
                                            deletePost(post.postid);
                                          }}>
                                          <Delete />
                                        </button>
                                        &nbsp;&nbsp;&nbsp;
                                        {/* {Archive savepost Function To come from here} */}
                                        {/* <button
                   style={{
                     backgroundColor: 'blue',
                     width: '50px',
                   }}>
                   <ArchiveIcon />
                 </button> */}
                                      </section>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </>
                  )}
                </div>
              </section>
            </>
          )}
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default Saved_post;
