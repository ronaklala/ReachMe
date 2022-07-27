/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import GroupsIcon from '@mui/icons-material/Groups';
import SendIcon from '@mui/icons-material/Send';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {Avatar} from '@mui/material';
import {useEffect, useState} from 'react';
import img from './images/close.png';
import $ from 'jquery';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const MobileMenu = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem('user');

    window.location.href = '/';
  };

  function hideMenu() {
    $('.m-menu').fadeOut();
  }
  return (
    <>
      <section className="m-menu">
        <nav>
          <ul>
            <li>
              <a href={'/' + user.wallet}>
                {user.profile_url === null ? (
                  <>
                    <Avatar
                      alt="Profile Image"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      sx={{width: 26, height: 26}}
                    />
                  </>
                ) : (
                  <>
                    <Avatar
                      alt="Remy Sharp"
                      src={user.profile_url}
                      sx={{width: 26, height: 26}}
                    />
                  </>
                )}

                {user.username}
              </a>
            </li>

            <li>
              <a href="/users">
                <PeopleIcon /> Users
              </a>
            </li>
            <li>
              <a href="/MarketPlace">
                <LocalGroceryStoreIcon />
                NFT ShowCase
              </a>
            </li>
            <li>
              <a href="/groups">
                <GroupsIcon />
                Groups
              </a>
            </li>

            <li>
              <a href="#">
                <SaveAltIcon />
                Saved
              </a>
            </li>

            <li>
              <a href="/messages">
                <SendIcon />
                Messages
              </a>
            </li>
            <li>
              <a href="/buy-crypto">
                <ShoppingBagIcon />
                Buy Crypto
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  Logout();
                }}>
                <ExitToAppIcon />
                Logout
              </a>
            </li>
          </ul>
          <img
            src={img}
            id="close-img"
            onClick={() => {
              hideMenu();
            }}
          />
        </nav>
      </section>
    </>
  );
};

export default MobileMenu;
