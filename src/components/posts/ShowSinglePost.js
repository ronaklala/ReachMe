/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { css } from '@emotion/react';

const ShowSinglePost = (props) => {
  const postid = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

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
          setPost(res.data);
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
              <span>{post.tag}</span>
              <span>{post.caption}</span>
              <a href={'/' + post.wallet}>
                <div className="user">
                  <Avatar src={props.profile_url}></Avatar>
                  <span>{props.wallet}</span>
                </div>
              </a>
              <span>{moment(post.createdAt).format('LLL')}</span>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ShowSinglePost;
