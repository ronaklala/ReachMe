import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../sass/sidebar.scss';
import {css} from '@emotion/react';
import {SyncLoader} from 'react-spinners';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let [loading, setLoading] = useState(true);

  const wallet = useParams();
  useEffect(() => {
    getPosts();
  },[]);
  const getPosts = async () => {
    await axios.get('http://localhost:5001/posts/' + wallet.uid).then((res) => {
      setLoading(false);
      setPosts(res.data.doc);
      console.log(posts);
    });
  };

  

  return (
    <>
      {loading == true ? (
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
                  <h1>No Posts Found For Your Wallet</h1>
                  <a href="/create-post">
                    <button>Create One Now</button>
                  </a>
                </>
              ) :
               (
                <>
                  <ul>
                    {posts.map((post, id) => (
                      <a href={'/p-self/' + post._id}>
                        <li key={post._id} id={post._id}>
                          <div className="post">
                            <img src={post.image} alt={post.image} />
                            <h3>{post.tag}</h3>
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
