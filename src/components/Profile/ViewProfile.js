import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './profile.scss';
import {toast} from 'react-toastify';

const ViewProfile = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({});
  const [count, setPostCount] = useState();
  const [file, setFile] = useState();

  const wallet = useParams();

  useEffect(() => {
    const getUserData = () => {
      axios
        .get('/' + wallet.uid)
        .then((res) => {
          setuser(res.data.users[0]);
          setFile(res.data.users[0].profile_url);
          setPostCount(res.data.numbers);

          console.log(file);
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
      wallet: user.wallet,
      url: url,
    };
    await axios
      .post('http://localhost:5001/user_pic', photo)
      .then((res) => {
        console.log('Data sent');
        if (res.status === 200) {
          toast.success(
            'Profile Photo Set Successfully, Login Again to see Changes everywhere',
            {
              toastId: 123 + 3,
            }
          );
        }
      })
      .catch((err) => {
        toast.error('Internal Server Error', {});
      });
  };

  return (
    <>
      <section className="profile">
        <div className="profile-image">
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{display: 'none'}}
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
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
        <div className="profile-info">
          <span>{user.username}</span>
          <span>{user.wallet}</span>
          <span>User ID :- {user._id}</span>
          <span>Total Followers :- </span>
          <span>Number of Posts :- {count}</span>
        </div>
      </section>
    </>
  );
};

export default ViewProfile;
