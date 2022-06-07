import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './sass/sidebar.scss';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
const HomePage = (props) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);
  const [time, setTime] = useState({});
  let [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const today = new Date();
  useEffect(() => {
    getPosts();
    setTime(today.getHours());
  }, []);

  const getPosts = async () => {
    await axios.get('/posts').then((res) => {
      setPosts(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };
  
  return (
    <>
    {console.log(user.username)}
    <div>
      <section className="home">
        <div className="greetings">
          {time <= 12 ? (
            <>
              <span>
                <b>Good Morning, {props.username}</b>
                <a href="/create-post">
                  <button>Make A Post</button>
                </a>
              </span>
              <text>Hope You are having a good day</text>
            </>
          ) : (
            <>
              <span>
                <b>Good Evening, {props.username}</b>
                <a href="/create-post">
                  <button>Make A Post</button>
                </a>
              </span>
              <text>Hope You are having a good day</text>
            </>
          )}
        </div>
      </section>
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
          <div className="posts grid-container">
            <div className="gridc post-parent">
              {posts.length == 0 ? (
                <>
                  <h1>No Posts Found For Your Wallet</h1>
                  <a href="/create-post">
                    <button>Create One Now</button>
                  </a>
                </>
              
              ) : (
                <>
                  
                  
                  <ul>
                {posts.map((post) => (
                  post.username != user.username ?(
                    <>
                    {console.log(posts.username)}
                  <a href={'/p/' + post._id}>
                    <li key={post._id} id={post._id}>
                      <div className="post">
                        <img src={post.image} alt={post.image} />
                        <h3>{post.tag}</h3>
                      </div>
                    </li>
                  </a>
                  </>
                  ):<></>
                ))}
              </ul>
                      

                  
                </>
              )}
            </div>
          </div>
          </>
          )}
          </div>
    </>
  );
};

export default HomePage;
