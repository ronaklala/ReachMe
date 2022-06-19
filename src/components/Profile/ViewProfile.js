/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './profile.scss';
import { toast } from 'react-toastify';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { PuffLoader, SyncLoader } from 'react-spinners';
import { css } from '@emotion/react';
import $ from 'jquery';

const ViewProfile = (props) => {
  const navigate = useNavigate();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [user, setuser] = useState([]);
  const [count, setPostCount] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true);
  const [btnloading, setbtnLoading] = useState(true);

  const wallet = useParams();

  useEffect(() => {
    const getUserData = () => {
      axios
        .get('http://localhost:5001/' + wallet.uid)
        .then((res) => {
          setuser(res.data.users);
          setFile(res.data.users[0].profile_url);
          setPostCount(res.data.numbers);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate('/error');
          }
        });
    };

    getUserData();
  }, []);

  const handleChange = async (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'user_pics');

    const dataFile = await fetch(
      'https://api.cloudinary.com/v1_1/ronaklala-games/image/upload',
      {
        method: 'POST',
        body: data,
      }
    ).then((r) => r.json());
    setFile(dataFile.secure_url);
    PostUserPic(dataFile.secure_url);
  };
  const PostUserPic = async (url) => {
    const photo = {
      wallet: user[0].wallet,
      url: url,
    };
    await axios
      .post('http://localhost:5001/user_pic', photo)
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            'Profile Photo Set Successfully, Login Again to see Changes everywhere',
            {
              toastId: 123 + 3,
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      })
      .catch((err) => {
        toast.error('Internal Server Error', {});
      });
  };

  const ifFollowed = (id) => {
    $('#follow' + id).hide();
    $('#unfollow' + id).show();
    setbtnLoading(false);
  };

  const isUnfollowed = (id) => {
    $('#follow' + id).show();
    $('#unfollow' + id).hide();
    setbtnLoading(false);
  };

  function newFunction(users) {
    setTimeout(() => {
      users.followers.includes(props.uid)
        ? ifFollowed(users._id)
        : isUnfollowed(users._id);
    }, 2000);
  }

  const follow = (id) => {
    axios
      .post('http://localhost:5001/followuser/' + id + '/' + props.uid)
      .then((res) => {
        var el = parseInt($('#count').text());
        $('#count').text(el + 1);
        setTimeout(() => {
          ifFollowed(id);
        }, 2000);
      });
  };

  const unFollow = (id) => {
    axios
      .post('http://localhost:5001/unfollowuser/' + id + '/' + props.uid)
      .then((res) => {
        var el = parseInt($('#count').text());
        $('#count').text(el - 1);
        setTimeout(() => {
          isUnfollowed(id);
        }, 2000);
      });
  };

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
              <h2>Loading Profile Data......</h2>
            </center>
          </div>
        </>
      ) : (
        <>
          <section className="profile">
            <div className="profile-image">
              <label htmlFor="btn-upload">
                {user[0].wallet === props.wallet ? (
                  <>
                    <input
                      id="btn-upload"
                      name="btn-upload"
                      style={{ display: 'none' }}
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <></>
                )}

                {file === null ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="profile_image"
                    id="user_image"
                  />
                ) : (
                  <img src={file} alt="profile_image" id="user_image" />
                )}
              </label>
            </div>
            {user.map((users) => (
              <div className="profile-info">
                <span>{users.username}</span>
                <span>{users.wallet}</span>
                <span>User ID :- {users._id}</span>
                {users.followers !== 0 ? (
                  <>
                    <span>
                      Total Followers :-{' '}
                      <span id="count">{users.followers.length}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span>Total Followers :- 0</span>
                  </>
                )}

                <span>Number of Posts :- {count}</span>
                {users.username === props.username ? (
                  <></>
                ) : (
                  <>
                    {newFunction(users)}
                    {btnloading === true ? (
                      <>
                        <PuffLoader color="red" css={override} size={30} />
                      </>
                    ) : (
                      <></>
                    )}
                    <button
                      onClick={() => {
                        follow(users._id);
                      }}
                      style={{ display: 'none' }}
                      id={'follow' + users._id}
                      type="submit">
                      <PersonAddIcon />
                      Follow
                    </button>
                    <button
                      onClick={() => {
                        unFollow(users._id);
                      }}
                      style={{ display: 'none' }}
                      id={'unfollow' + users._id}
                      type="submit">
                      <PersonRemoveIcon />
                      UnFollow
                    </button>
                  </>
                )}
              </div>
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default ViewProfile;
