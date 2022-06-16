import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../sass/sidebar.scss';
import {css} from '@emotion/react';
import {SyncLoader} from 'react-spinners';
import {Delete} from '@mui/icons-material';

const Posts = () => {
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
  }, []);
  const getPosts = async () => {
    await axios.get('http://localhost:5001/posts/' + wallet.uid).then((res) => {
      setLoading(false);
      setPosts(res.data.doc);
      console.log(posts);
    });
  };

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
                  <h1>No Posts Found</h1>
                </>
              ) : (
                <>
                  <ul>
                    {posts.map((post, id) => (
                      <a href={'/post/' + post._id}>
                        <li key={post._id} id={post._id}>
                          <div className="post">
                            <img src={post.image} alt={post.image} />
                            <h3>{post.tag}</h3>
                            {post.username === user.username ? (
                              <>
                                <section className="showcase">
                                  <button
                                    style={{
                                      backgroundColor: '#f00',
                                      width: '50px',
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
                      </a>
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
