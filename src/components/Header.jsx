
import React, {useEffect, useState} from 'react';
import './sass/header.scss';
import SendIcon from '@mui/icons-material/Send';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {MenuRounded, Search} from '@mui/icons-material';
import {Avatar} from '@mui/material';
// import { search } from '../backend/queries/transaction';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [user1, setuser] = useState([]);
  var[search, onsearch] = useState([])
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
    
  }, []);
  
  
  const Logout = () => {
    sessionStorage.removeItem('user');
    
    window.location.href = '/';
  };
  // function onsearch2() {
  //   navigate(`/search${serach}`);
  // }
  return (
    <>
      
      <section className="header">
        <nav>
          <a href="/">
            <h2>{process.env.REACT_APP_NAME}</h2>
          </a>
          <div className="search">
            <input
              type="search"
              name="search"
              onChange={(e) => onsearch(e.target.value)}
              placeholder="Search User"
            />
            <a href={'/search/'+ search}>
            <button >
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
                    {user.profile_url === null ? (
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
                          src={user.profile_url}
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
          <MenuRounded className="menu-icon" />
        </nav>
      </section>

    </>
  );
};

export default Header;
