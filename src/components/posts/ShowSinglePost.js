/* eslint-disable react-hooks/exhaustive-deps */
import {Avatar} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
import Comment from '../Comment';
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
      .get('https://jinx-social.herokuapp.com/p-self/' + postid.postid)
      .then((res) => {
        if (res.status === 201) {
          setPost(res.data[0]);
          setUser_data(res.data[1]);
          setLoading(false);
          console.log(res);
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
              <a href={'/' + post.wallet}>
                {user_data.map((user, index) => (
                  <>
                    <div className="user">
                      <Avatar src={user.profile_url}></Avatar>
                      <span>{user.username}</span>
                    </div>
                  </>
                ))}
              </a>
              <greyscale>Posted {moment(post.createdAt).fromNow()}</greyscale>
              {post.likes.length === 0 ? (
                <>
                  <greyscale>No Likes Till Now on this Post</greyscale>
                </>
              ) : (
                <>
                  <greyscale>{post.likes.length} likes on this post</greyscale>
                </>
              )}
              <text style={{fontSize: '18px'}}>{post.tag}</text>
              <text>{post.caption}</text>
              <Comment
                username={props.username}
                wallet={props.wallet}
                profile_url={props.profile_url}
                uid={props.uid}
              />
              <Comments />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ShowSinglePost;
