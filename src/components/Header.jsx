/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './sass/header.scss';
import SendIcon from '@mui/icons-material/Send';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {MenuRounded, Search} from '@mui/icons-material';
import {Avatar} from '@mui/material';
import $ from 'jquery';
import {useMoralis} from 'react-moralis';
// import { search } from '../backend/queries/transaction';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  var [search, onsearch] = useState([]);
  const {Moralis} = useMoralis();
  useEffect(() => {
    getUsersData();
    if (user === null) {
      navigate('/register');
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };
  // function onsearch2() {
  //   navigate(`/search${serach}`);
  // }

  const [getuser, setusers] = useState([]);
  const getUsersData = async () => {
    await axios
      .get('https://jinx-social.herokuapp.com/getusers/' + user.wallet)
      .then((res) => {
        setusers(...res.data.doc);

        // console.log(res.data.doc)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function showMenu() {
    $('.m-menu').fadeIn();
  }
  return (
    <>
      <section className="header">
        <nav>
          <a
            href="/"
            style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <img
              src="https://res.cloudinary.com/ronaklala-games/image/upload/v1657619895/posts/favicon_dfjgrb.png"
              height={'40px'}
              alt="logo"
            />
            <h2>{process.env.REACT_APP_NAME}</h2>
          </a>
          <div className="search">
            <input
              type="search"
              name="search"
              onChange={(e) => onsearch(e.target.value)}
              placeholder="Search User"
              required
            />
            <a href={'/search/' + search}>
              <button type="submit">
                <Search />
              </button>
            </a>
          </div>

          <menu>
            <ul>
              <li>
                <a href="/messages/">
                  <SendIcon />
                </a>
              </li>
              {user !== null ? (
                <a href={'/' + user.wallet}>
                  <li>
                    {getuser.profile_url == null ? (
                      <>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          sx={{width: 30, height: 30}}
                        />
                      </>
                    ) : (
                      <>
                        <Avatar
                          alt="Remy Sharp"
                          src={getuser.profile_url}
                          sx={{width: 30, height: 30}}
                        />
                      </>
                    )}
                  </li>
                </a>
              ) : (
                <></>
              )}
              <li>
                <button onClick={Logout}>Logout</button>
              </li>
              <ToastContainer />
            </ul>
          </menu>
          <MenuRounded
            className="menu-icon"
            onClick={() => {
              showMenu();
            }}
          />
        </nav>
      </section>
    </>
  );
};

export default Header;
