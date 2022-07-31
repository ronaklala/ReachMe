/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../sass/sidebar.scss';
import {css} from '@emotion/react';
import {SyncLoader} from 'react-spinners';
import {Delete} from '@mui/icons-material';
import {toast} from 'react-toastify';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [user, setUser] = useState({});

  let [loading, setLoading] = useState(true);

  const wallet = useParams();
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
    getPosts();
    document.title = 'Posts';
  }, []);
  const getPosts = async () => {
    await axios
      .get('https://jinx-social.herokuapp.com/posts/' + wallet.uid)
      .then((res) => {
        setLoading(false);
        setPosts(res.data.doc);
        console.log(posts);
      });
  };

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };

  //Function to delete a post
  function deletePost(postId) {
    axios
      .delete(
        `https://jinx-social.herokuapp.com/deletepost/${postId}`,
        axiosConfig
      )
      .then((res) => {
        toast.success('Post Deleted Successfully', {
          toastId: 1234 + 111,
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error('Internal Server Error', {
            toastId: 111 + 123,
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }

  return (
    <>
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
              {posts.length === 0 ? (
                <>
                  <center style={{width: '100%', marginTop: '20px'}}>
                    <img
                      src="https://res.cloudinary.com/ronaklala-games/image/upload/v1657799759/posts/Untitled_design_1_lfhe7e.gif"
                      height={250}
                    />
                    <h1 style={{color: '#fff', fontSize: '36px'}}>
                      No Posts Found
                    </h1>
                  </center>
                </>
              ) : (
                <>
                  <ul>
                    {posts.map((post, id) => (
                      <li key={post._id} id={post._id}>
                        <div className="post">
                          <a href={'/post/' + post._id}>
                            <img src={post.image} alt={post.image} />
                          </a>
                          <h3>{post.tag}</h3>
                          {post.wallet === user.wallet ? (
                            <>
                              <section className="showcase">
                                <button
                                  type="submit"
                                  style={{
                                    backgroundColor: '#f00',
                                    width: '50px',
                                  }}
                                  onClick={() => {
                                    deletePost(post._id);
                                  }}>
                                  <Delete />
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                {/* {Archive Posts Function To come from here} */}
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
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Posts;
