/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Avatar} from '@mui/material';
import moment from 'moment';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const gid = useParams();

  //Function for if a post has link in it, it will make it redirectable
  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, function (url) {
      var hyperlink = url;
      if (!hyperlink.match('^https?://')) {
        hyperlink = 'http://' + hyperlink;
      }
      return (
        '<a className="blue" href="' +
        url +
        '" rel="noopener" noreferrer>' +
        url +
        '</a>'
      );
    });
    // or alternatively
  }

  useEffect(() => {
    axios
      .get('https://jinx-social.herokuapp.com/group/' + gid.gid + '/getPosts')
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
                <>
                  <li key={index}>
                    <div className="user-info">
                      {post.user_details.map((user, index) => (
                        <>
                          {user.profile_url === null ? (
                            <>
                              <Avatar
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                sx={{width: 26, height: 26}}
                              />
                            </>
                          ) : (
                            <>
                              <Avatar
                                src={user.profile_url}
                                sx={{width: 26, height: 26}}
                              />
                            </>
                          )}
                          <span>
                            {' '}
                            <a href={'/' + post.wallet}>{user.username} </a>
                          </span>
                          <greyscale>
                            posted {moment(post.createdAt).fromNow()}
                          </greyscale>
                        </>
                      ))}
                    </div>
                    <a href={'/gpost/' + post._id}>
                      <div className="post-image">
                        <img src={post.image} />
                      </div>
                    </a>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: urlify(post.caption),
                      }}></span>
                    <div className="post-footer">
                      <div className="likes">
                        <button>Like</button>
                      </div>
                      <div className="usrtip">
                        <button>Tip 0.0005</button>
                      </div>
                      <div className="cmnt">
                        <button>3 Comments</button>
                      </div>
                    </div>
                  </li>
                </>
              ))}
            </>
          )}
        </ul>
      </section>
    </>
  );
};

export default Posts;
