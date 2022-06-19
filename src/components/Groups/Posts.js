/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@mui/material';
import moment from 'moment';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const gid = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:5001/group/' + gid.gid + '/getPosts')
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <>
      <section className="posts-group">
        <ul>
          {posts.length === 0 ? (
            <>
              <center>
                <h2>No Posts Found in this Group</h2>
              </center>
            </>
          ) : (
            <>
              {posts.map((post, index) => (
                <li key={index}>
                  <div className="user-info">
                    {post.user_details.map((user, index) => (
                      <>
                        {user.profile_url === null ? (
                          <>
                            <Avatar
                              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              sx={{ width: 26, height: 26 }}
                            />
                          </>
                        ) : (
                          <>
                            <Avatar
                              src={user.profile_url}
                              sx={{ width: 26, height: 26 }}
                            />
                          </>
                        )}
                        <span>{user.username}</span>
                        <greyscale>
                          posted {moment(post.createdAt).fromNow()}
                        </greyscale>
                      </>
                    ))}
                  </div>
                  <div className="post-image">
                    <img src={post.image} />
                  </div>
                  <div className="user-info">
                    {post.user_details.map((user, index) => (
                      <>
                        {user.profile_url === null ? (
                          <>
                            <Avatar
                              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              sx={{ width: 26, height: 26 }}
                            />
                          </>
                        ) : (
                          <>
                            <Avatar
                              src={user.profile_url}
                              sx={{ width: 26, height: 26 }}
                            />
                          </>
                        )}
                        <span>
                          {user.username}{' '}
                          <greyscale>says this about the post,</greyscale>
                        </span>
                      </>
                    ))}
                  </div>
                  <span>{post.caption}</span>
                  <div className="likes"></div>
                </li>
              ))}
            </>
          )}
        </ul>
      </section>
    </>
  );
};

export default Posts;
