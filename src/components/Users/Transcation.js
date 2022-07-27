/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './users.scss';
import MobileMenu from '../MobileMenu';
import FooterSection from '../FooterSection';
import ShowTransaction from './showTransaction';

const Transcation = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

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
          <ShowTransaction
            username={user.username}
            wallet={user.wallet}
            id={user._id}
            profile_url={user.profile_url}
          />
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default Transcation;
