/* eslint-disable react-hooks/exhaustive-deps */
import {Avatar} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
import Comment from './../Comment';
import Comments from './../Comments/Comments';

const ShowSinglePost = (props) => {
  const postid = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [user_data, setUser_data] = useState({});

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  //Getting Post Data here
  const getPostData = async () => {
    await axios
      .get('http://localhost:5001/p-self/' + postid.postid)
      .then((res) => {
        if (res.status === 201) {
          setPost(res.data[0]);
          setUser_data(res.data[1]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          window.location.href = '/error';
        }
      });
  };

  //Running only this once to get data
  useEffect(() => {
    getPostData();
  }, []);

  function dateFormat(date) {
    const month = date.getMonth();
    const day = date.getDate();
    const monthString = month >= 10 ? month : `0${month}`;
    const dayString = day >= 10 ? day : `0${day}`;
    return `${date.getFullYear()}-${monthString}-${dayString}`;
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
              <h2>Loading Your Post......</h2>
            </center>
          </div>
        </>
      ) : (
        <>
          <section className="single-post">
            {post.image === '' ? (
              <></>
            ) : (
              <>
                <div className="post-image">
                  <img src={post.image} alt="Post" />
                </div>
              </>
            )}

            <div className="post-info">
              <a href={'/' + post.wallet}>
                {user_data.map((user, index) => (
                  <>
                    <div className="user">
                      <Avatar src={user.profile_url}></Avatar>
                      <span>{post.wallet}</span>
                      <greyscale>
                        Posted {moment(post.createdAt).fromNow()}
                      </greyscale>
                    </div>
                  </>
                ))}
              </a>
              <span>{post.tag}</span>
              <span className="caption">{post.caption}</span>
            </div>

            {/* <Comments />
            <Comment /> */}
          </section>
        </>
      )}
    </>
  );
};

export default ShowSinglePost;
