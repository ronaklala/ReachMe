import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import './sass/main.scss';
import {useMoralis} from 'react-moralis';

const Login = () => {
  const {authenticate, isAuthenticated, user} = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate()
        .then(function (user) {
          console.log(user.get('ethAddress'));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log(user);
    }
  };

  //Axios Config
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };

  //State of Wallet for Logging in
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    login();
    const ConnectWallet = () => {
      if (window.ethereum) {
        window.ethereum
          .request({method: 'eth_requestAccounts'})
          .then((res) => accountChangeHandler(res[0]));
        console.log(wallet);
      } else {
        toast.error('install metamask extension!!', {
          toastId: 127 + 7,
        });
      }
    };
    const accountChangeHandler = (account) => {
      // Setting
      setWallet({wallet: account});
    };
    ConnectWallet();
  }, []);

  //Login Function
  const LoginUser = () => {
    if (wallet !== '') {
      axios
        .post('http://localhost:5001/login', wallet, axiosConfig)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.doc;
            sessionStorage.setItem('user', JSON.stringify(data));
            toast.success('Logged In Successfully');
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error(
              'No Id is Registered With This Wallet Address! Please Register First',
              {
                toastId: 123 + 3,
              }
            );
          }
        });
    }
  };

  return (
    <>
      <section className="login">
        <div className="form">
          <center>
            <h1>Login Into {process.env.REACT_APP_NAME}</h1>
          </center>
          <label>Wallet Address</label>
          <button onClick={LoginUser}>Connect Wallet</button>
          <br />
          <span>
            Dont have an Account? <Link to="/register">Register Now</Link>
          </span>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
