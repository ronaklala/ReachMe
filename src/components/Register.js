/* eslint-disable eqeqeq */
import axios from 'axios';
import React, {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import './sass/main.scss';
import {useNavigate} from 'react-router-dom';
import {TextField} from '@mui/material';
import {db} from '../firebase';

const Register = () => {
  document.title = 'Register';
  const navigate = useNavigate();
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const customId = 'Id715816756458456';

  //User State
  const [user, setUser] = useState({
    wallet: '',
    email: '',
    username: '',
  });

  const data = {
    id: user.wallet,
    email: user.email,
    name: user.username,
  };

  //Handling Inputs
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  //Register a User
  const RegisterUser = async (e) => {
    e.preventDefault();
    if (user.email === '' || user.username === '') {
      toast.error('Fill Form', {
        toastId: customId + 123,
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (user.wallet === '') {
      ConnectWallet();
    } else {
      db.collection('users').add(data);
      console.log(data);
      axios
        .post('https://jinx-social.herokuapp.com/register', user, axiosConfig)
        .then((res) => {
          if (res.status === 201) {
            toast.success('Wallet Registration Done Successfully', {
              toastId: customId + 2,
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error('Wallet Already Registered', {
              toastId: customId + 3,
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

  /* Wallet Connection */
  const ConnectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'}).then((res) => {
        accountChangeHandler(res[0]);
      });
    } else {
      toast.error('install metamask extension!!', {
        toastId: 127 + 7,
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const accountChangeHandler = (account) => {
    // Setting the users wallet
    user.wallet = account;
    toast.success(account + 'Successfully Connected', {
      toastId: customId,
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(user);
  };
  return (
    <>
      <section className="login">
        <div className="form">
          <center>
            <img
              src="https://res.cloudinary.com/ronaklala-games/image/upload/v1657619895/posts/favicon_dfjgrb.png"
              alt="logo img"
              height={'150px'}
              style={{borderRadius: '50%'}}
            />
            <h1>Register Into {process.env.REACT_APP_NAME}</h1>
          </center>
          <label>Wallet Address</label>
          <button onClick={ConnectWallet}>Connect Wallet</button>
          <TextField
            variant="outlined"
            label="Email"
            InputLabelProps={{
              style: {color: 'white'},
            }}
            name="email"
            fullWidth
            defaultValue={user.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="User / Display Name"
            name="username"
            InputLabelProps={{
              style: {color: 'white'},
            }}
            fullWidth
            defaultValue={user.username}
            onChange={handleChange}
          />
          <button type="submit" onClick={RegisterUser}>
            Register
          </button>
          <span>
            Already Registered? <a href="/login">Login Now</a>
          </span>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Register;
