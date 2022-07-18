import React, {useEffect, useState} from 'react';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
import moment from 'moment';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Avatar} from '@mui/material';

const SinglePost = (props) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  const url = useParams();

  const getPost = async () => {
    await axios
      .get('https://jinx-social.herokuapp.com/gpost/' + url.pid)
      .then((res) => {
        setPost(res.data[0]);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.code === 'ERR_BAD_RESPONSE') {
          window.location.href = '/error';
        }
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
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
              <h2>Loading Post......</h2>
            </center>
          </div>
        </>
      ) : (
        <>
          {post.group.map((gdata) =>
            gdata.members.includes(props.id) ? (
              <>
                <section className="single-nft">
                  <div className="nft-image">
                    <img src={post.image} alt={post.image} />
                  </div>
                  <div className="info">
                    <div className="user-info">
                      {post.user_details.map((user, index) =>
                        user.profile_url === null ? (
                          <>
                            <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                            {user.username}
                          </>
                        ) : (
                          <>
                            <Avatar src={user.profile_url} />
                            {user.username}
                          </>
                        )
                      )}
                    </div>
                    <span>{post.caption}</span>
                    <greyscale>
                      Posted {moment(post.createdAt).fromNow()}
                    </greyscale>
                    <div>Group Details</div>
                    <div className="user-info">
                      {post.group.map((groups, index) =>
                        groups.profile_url === null ? (
                          <>
                            <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                            {groups.name}
                          </>
                        ) : (
                          <>
                            <Avatar src={groups.image} />
                            {groups.name}
                          </>
                        )
                      )}
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <>{(window.location.href = '/error')}</>
            )
          )}
        </>
      )}
    </>
  );
};

export default SinglePost;
