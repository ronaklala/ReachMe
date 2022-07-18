import {TextField} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import FooterSection from '../FooterSection';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import './users.scss';

const UpdateProfile = () => {
  const [user, setUser] = useState({});

  const [userdata, setUserData] = useState();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
      setLoading(false);
    } else {
      setUser();
    }
  }, []);

  const uid = useParams();

  const handleInput = (e) => {
    const {name, value} = e.target;
    setUserData((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userdata === undefined) {
      toast.warning('Nothing to Update for now', {
        toastId: 123 + 7,
      });
    } else {
      userdata.wallet = uid.uid;
      axios
        .post(
          'https://jinx-social.herokuapp.com/updateProfile/' + userdata.wallet,
          userdata
        )
        .then((res) => {
          toast.success(
            'Profile Updated SuccessFully, Login Again to See Changes',
            {
              toastId: 1,
            }
          );
        });
    }
  };
  return (
    <>
      {loading === true ? (
        <>
          <h1 style={{color: '#fff'}}>Loading Profile Data...</h1>
        </>
      ) : (
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
              {uid.uid === user.wallet ? (
                <>
                  <section className="update">
                    <form>
                      <center>
                        <h2>Update Profile</h2>
                      </center>

                      <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        InputLabelProps={{
                          style: {color: 'white'},
                        }}
                        onChange={handleInput}
                        defaultValue={user.username}
                        name="username"
                      />
                      <TextField
                        variant="outlined"
                        label="email"
                        fullWidth
                        InputLabelProps={{
                          style: {color: 'white'},
                        }}
                        onChange={handleInput}
                        defaultValue={user.email}
                        name="email"
                      />
                      <input
                        type="submit"
                        onClick={handleSubmit}
                        value="Update Profile"
                      />
                    </form>
                  </section>
                </>
              ) : (
                <>{(window.location.href = '/error')}</>
              )}
            </section>
          </section>
          <FooterSection />
        </>
      )}
    </>
  );
};

export default UpdateProfile;
