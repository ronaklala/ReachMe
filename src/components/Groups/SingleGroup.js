import {Avatar} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header';
import {css} from '@emotion/react';
import {PuffLoader, SyncLoader} from 'react-spinners';
import Sidebar from '../Sidebar';
import moment from 'moment';
import './groups.scss';
import $ from 'jquery';

const SingleGroup = () => {
  const [group, setGroupData] = useState({});
  const gr = useParams();
  const [loading, setLoading] = useState(true);
  const [btnloading, setbtnLoading] = useState(true);

  const getGroupData = () => {
    axios.get('http://localhost:5001/group/' + gr.gid).then((res) => {
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

  const userJoined = (id) => {
    $('#follow' + id).hide();
    $('#unfollow' + id).show();
    setbtnLoading(false);
  };

  const userLeft = (id) => {
    $('#follow' + id).show();
    $('#unfollow' + id).hide();
    setbtnLoading(false);
  };

  function checkGroupJoin(group) {
    setTimeout(() => {
      group.members.includes(user._id)
        ? userJoined(user._id)
        : userLeft(user._id);
    }, 2000);
  }

  const joinGroup = (id, gid) => {
    axios
      .post('http://localhost:5001/join_group/' + id + '/' + gid)
      .then((res) => {
        var el = parseInt($('#count').text());
        $('#count').text(el + 1);
        setTimeout(() => {
          userJoined(id);
        }, 2000);
      });
  };

  const leaveGroup = (uid, gid) => {
    axios
      .post('http://localhost:5001/leave_group/' + uid + '/' + gid)
      .then((res) => {
        var el = parseInt($('#count').text());
        $('#count').text(el - 1);
        setTimeout(() => {
          userLeft(uid);
        }, 2000);
      });
  };

  return (
    <>
      <Header />
      <section className="wrapper">
        <section className="container">
          <Sidebar
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
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
                        <Avatar
                          alt="Remy Sharp"
                          src={group.image}
                          sx={{width: 175, height: 175}}
                        />
                      </>
                    )}
                  </div>
                  <div className="g-info">
                    <span>{group.name}</span>
                    <span>Created {moment(group.createdAt).fromNow()}</span>
                    <span>
                      <span id="count">{group.members.length}</span> Members
                    </span>
                    <span>{group.posts.length} Posts</span>
                    {group.username === user.username ? (
                      <></>
                    ) : (
                      <>
                        {checkGroupJoin(group)}
                        {btnloading === true ? (
                          <>
                            <PuffLoader color="red" css={override} size={30} />
                          </>
                        ) : (
                          <></>
                        )}
                        <button
                          onClick={() => {
                            joinGroup(user._id, group._id);
                          }}
                          style={{display: 'none'}}
                          id={'follow' + user._id}
                          type="submit">
                          Join Group
                        </button>
                        <button
                          onClick={() => {
                            leaveGroup(user._id, group._id);
                          }}
                          style={{display: 'none'}}
                          id={'unfollow' + user._id}
                          type="submit">
                          Leave Group
                        </button>
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

                  {group.members.includes(user._id) ? (
                    <>
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
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
                <div className="info">
                  <h3>This Group was Created By </h3>

                  {group.user_details.map((userdata) =>
                    userdata.username === group.username ? (
                      <>
                        <a href={'/' + userdata.wallet}>
                          <div className="admin">
                            {userdata.profile_url === null ? (
                              <>
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                              </>
                            ) : (
                              <>
                                <img src={userdata.profile_url} />
                              </>
                            )}
                            <div className="user_info">
                              <span>{userdata.username}</span>
                              <span
                                style={{
                                  width: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}>
                                Wallet: {userdata.wallet}
                              </span>
                            </div>
                          </div>
                        </a>
                      </>
                    ) : (
                      <></>
                    )
                  )}

                  <br />
                  <h3>About {group.name}</h3>
                  <p>{group.description}</p>
                </div>
              </section>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default SingleGroup;
