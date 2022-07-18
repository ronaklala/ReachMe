/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {css} from '@emotion/react';
import {SyncLoader} from 'react-spinners';
import {Avatar} from '@mui/material';
import moment from 'moment';
import './groups.scss';

const MembersList = () => {
  const [group, setGroupData] = useState({});
  const gr = useParams();
  const [loading, setLoading] = useState(true);

  const getGroupData = () => {
    axios
      .get('https://jinx-social.herokuapp.com/group/' + gr.gid)
      .then((res) => {
        setGroupData(res.data[0]);
        setLoading(false);
      });
  };

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

    getGroupData();
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
              <h2>Loading Group Data......</h2>
            </center>
          </div>
        </>
      ) : (
        <>
          <section className="single-group">
            <div className="group-profile">
              <div className="g-img">
                {group.image === null ? (
                  <>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://pbs.twimg.com/profile_images/857490466572443648/c05JqEgo_400x400.jpg"
                      sx={{width: 175, height: 175}}
                    />
                  </>
                ) : (
                  <>
                    <Avatar src={group.image} sx={{width: 175, height: 175}} />
                  </>
                )}
              </div>
              <div className="g-info">
                <span>{group.name}</span>
                <span>Created {moment(group.createdAt).fromNow()}</span>
                <span>{group.members.length} Members</span>
                <span>{group.posts.length} Posts</span>
                {group.username === user.username ? (
                  <></>
                ) : (
                  <>
                    <button>Join Group</button>
                  </>
                )}
              </div>
            </div>
            <ul>
              <a href={'/group/' + group._id}>
                <li>
                  <button>Description</button>
                </li>
              </a>
              <a href={'/group/' + group._id + '/members'}>
                <li>
                  <button>Members</button>
                </li>
              </a>
              <a href={'/group/' + group._id + '/posts'}>
                <li>
                  <button>Posts</button>
                </li>
              </a>
            </ul>
            <div className="members">
              <ul>
                {group.user_details.map((user, index) => (
                  <>
                    <li>
                      <a href={'/' + user.wallet}>
                        <div className="admin">
                          {user.profile_url === null ? (
                            <>
                              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                            </>
                          ) : (
                            <>
                              <Avatar
                                src={user.profile_url}
                                sx={{width: 100, height: 100}}
                              />
                            </>
                          )}
                          <div className="user_info">
                            <span>{user.username}</span>
                            <span>Wallet: {user.wallet}</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MembersList;
