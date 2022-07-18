/* eslint-disable jsx-a11y/alt-text */
import {PhotoCamera} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React, {useState} from 'react';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
import '../posts/create-post.scss';
import $ from 'jquery';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

const CreatePostGroup = (props) => {
  const [post, setPost] = useState({
    caption: '',
    image: '',
    uid: '',
    wallet: '',
  });

  const gid = useParams();

  const [file, setFile] = useState();

  const [loading, setLoading] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

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

  const handleInput = (e) => {
    const {name, value} = e.target;
    setPost((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post.uid = props.uid;
    post.wallet = props.wallet;
    axios
      .post(
        'https://jinx-social.herokuapp.com/group/' +
          gid.gid +
          '/createGroupPost',
        post
      )
      .then((res) => {
        toast.success('Post Created Successfully, Please Refresh To View', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      });
  };
  return (
    <>
      <section className="home">
        <div className="post">
          <form>
            <TextField
              variant="outlined"
              label="Caption"
              fullWidth
              onChange={handleInput}
              defaultValue={post.caption}
              InputLabelProps={{
                style: {color: 'white'},
              }}
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
    </>
  );
};

export default CreatePostGroup;
