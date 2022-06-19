/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { PhotoCamera } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import '../posts/create-post.scss';
import $ from 'jquery';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { useMoralis } from 'react-moralis';

const AddNFT = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const { Moralis, isAuthenticated } = useMoralis();
  const [button, setButton] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let [loading, setLoading] = useState(false);
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };

  useEffect(() => {
    const web3 = Moralis.enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [post, setPost] = useState({
    description: '',
    image: '',
    username: '',
    wallet: '',
    token_name: '',
  });

  //Adding image to Cloudinary and Post State and to IPFS for rarible minting
  const handleChange = async (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    let datafile = e.target.files[0];
    data.append('upload_preset', 'social_posts');
    const imageFile = new Moralis.File(datafile.name, datafile);

    await imageFile.saveIPFS();
    const imagehash = imageFile.hash();
    console.log(imageFile.ipfs(), imagehash);

    let metadata = {
      name: post.token_name,
      description: post.description,
      image: '/ipfs/' + imagehash,
    };
    const jsonFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    });
    console.log(metadata);
    await jsonFile.saveIPFS();
    let metadataHash = jsonFile.hash();
    console.log(metadataHash);
    await Moralis.Plugins.rarible
      .lazyMint({
        chain: 'rinkeby',
        userAddress: props.wallet,
        tokenType: 'ERC721',
        tokenUri: 'ipfs://' + metadataHash,
        supply: 100,
        royaltiesAmount: 50, // 0.05% royalty. Optional
      })
      .then((res) => {
        console.log(res);
      });

    toast.success('NFT Minting Started', {
      toastId: 12345 + 65,
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
    setButton(true);
  };

  //Handling the Input Data
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  //Submittind Data to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post.description === '' || post.token_name === '') {
      toast.error('Please Add Some Data to Post, Empty NFT Cannot be created', {
        toastId: 'customer' + 1,
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      post.username = props.username;
      post.wallet = props.wallet;
      axios
        .post('http://localhost:5001/MarketPlace', post, axiosConfig)
        .then((res) => {
          console.log(res.status);
          if (res.status === 201) {
            toast.success('NFT Added Successfully', {
              toastId: 1234 + 111,
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate('/MarketPlace/');
            }, 2000);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error('Internal Server Error', {
              toastId: 111 + 123,
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
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
              <h2>Add NFT {process.env.REACT_APP_NAME}</h2>
            </center>

            <TextField
              variant="outlined"
              inputMode="string"
              label="Enter Token name"
              fullWidth
              onChange={handleInput}
              defaultValue={post.token_name}
              name="token_name"
            />

            <TextField
              variant="outlined"
              inputMode="string"
              label="Enter Description"
              fullWidth
              onChange={handleInput}
              defaultValue={post.description}
              name="description"
            />
            <label htmlFor="btn-upload">
              Upload Image:&nbsp;&nbsp;&nbsp;
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
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
            {button === true ? (
              <>
                <input type="submit" onClick={handleSubmit} />
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default AddNFT;
