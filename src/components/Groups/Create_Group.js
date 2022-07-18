/* eslint-disable jsx-a11y/alt-text */
import {PhotoCamera} from '@mui/icons-material';
import {Button, css, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {SyncLoader} from 'react-spinners';
import Header from '../Header';
import Sidebar from '../Sidebar';
import $ from 'jquery';
import axios from 'axios';
import {toast} from 'react-toastify';
import MobileMenu from '../MobileMenu';
import FooterSection from '../FooterSection';

const Create_Group = () => {
  const [file, setFile] = useState();

  const [group, setGroup] = useState({
    name: '',
    description: '',
    image: '',
    username: '',
    wallet: '',
    uid: '',
  });

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    group.username = user.username;
    group.wallet = user.wallet;
    group.uid = user._id;
    if (group.name === '' || group.description === '') {
      toast.error('Please Fill the Whole Form', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios
        .post('https://jinx-social.herokuapp.com/create_group', group)
        .then((res) => {
          toast.success('Group Created Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.location.href = '/groups';
        })
        .catch({});
    }
  };

  const handleFile = async (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'social_posts');
    $('#image-text').hide();
    setLoading(true);
    const dataFile = await fetch(
      'https://api.cloudinary.com/v1_1/ronaklala-games/image/upload',
      {
        method: 'POST',
        body: data,
      }
    ).then((r) => r.json());

    group.image = dataFile.secure_url;
    setLoading(false);
    setFile(dataFile.secure_url);
  };

  //Handling the Input Data
  const handleChange = (e) => {
    const {name, value} = e.target;
    setGroup((event) => {
      return {
        ...event,
        [name]: value,
      };
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
          <MobileMenu />
          <section className="home">
            <div className="post">
              <form>
                <center>
                  <h2>Create a Group to {process.env.REACT_APP_NAME}</h2>
                </center>

                <TextField
                  id="outlined-basic"
                  label="Group Name"
                  InputLabelProps={{
                    style: {color: 'white'},
                  }}
                  variant="outlined"
                  onChange={handleChange}
                  defaultValue={group.name}
                  name="name"
                />
                <TextField
                  variant="outlined"
                  label="Group Description"
                  InputLabelProps={{
                    style: {color: 'white'},
                  }}
                  fullWidth
                  onChange={handleChange}
                  defaultValue={group.description}
                  name="description"
                />
                <label htmlFor="btn-upload">
                  Upload Image:&nbsp;&nbsp;&nbsp;
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{display: 'none'}}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                  />
                  <Button
                    className="btn-choose"
                    variant="contained"
                    component="span"
                    endIcon={<PhotoCamera />}>
                    Choose Image
                  </Button>
                </label>
                <div className="image">
                  <span id="image-text">{'/* Image Goes Here */'}</span>
                  <img src={file} />
                  {loading === true ? (
                    <SyncLoader
                      loading={loading}
                      css={override}
                      size={20}
                      color={'#2F2934'}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <input type="submit" onClick={handleSubmit} />
              </form>
            </div>
          </section>
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default Create_Group;
