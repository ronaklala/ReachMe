/* eslint-disable jsx-a11y/alt-text */
import {PhotoCamera} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React, {useState} from 'react';
import './create-post.scss';
import $ from 'jquery';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';

const CreatePostForm = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };
  const [post, setPost] = useState({
    caption: '',
    tag: '',
    image: '',
    username: '',
    wallet: '',
  });

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let [loading, setLoading] = useState(false);

  //Adding image to Cloudinary and Post State
  const handleChange = async (e) => {
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

    post.image = dataFile.secure_url;
    setLoading(false);
    setFile(dataFile.secure_url);
  };

  //Handling the Input Data
  const handleInput = (e) => {
    const {name, value} = e.target;
    setPost((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  //Submittind Data to Backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.tag === '' && post.caption === '') {
      toast.error(
        'Please Add Some Data to Post, Empty post Cannot be created',
        {
          toastId: 'customer' + 1,
        }
      );
    } else {
      post.username = props.username;
      post.wallet = props.wallet;
      axios
        .post('http://localhost:5001/create-post', post, axiosConfig)
        .then((res) => {
          console.log(res.status);
          if (res.status === 201) {
            toast.success('Post Created Successfully', {
              toastId: 1234 + 111,
            });
            setTimeout(() => {
              navigate('/posts/' + post.wallet);
            }, 2000);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error('Internal Server Error', {
              toastId: 111 + 123,
            });
          }
        });
    }
  };

  return (
    <>
      <section className="home">
        <div className="post">
          <form>
            <center>
              <h2>Create a Post to {process.env.REACT_APP_NAME}</h2>
            </center>

            <TextField
              id="outlined-basic"
              label="Tag-Line"
              variant="outlined"
              onChange={handleInput}
              defaultValue={post.tag}
              name="tag"
            />
            <TextField
              variant="outlined"
              label="Caption"
              fullWidth
              onChange={handleInput}
              defaultValue={post.caption}
              name="caption"
            />
            <label htmlFor="btn-upload">
              Upload Image:&nbsp;&nbsp;&nbsp;
              <input
                id="btn-upload"
                name="btn-upload"
                style={{display: 'none'}}
                type="file"
                accept="image/*"
                onChange={handleChange}
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
      <ToastContainer />
    </>
  );
};

export default CreatePostForm;
