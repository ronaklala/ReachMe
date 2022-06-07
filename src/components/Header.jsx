import './sass/header.scss';
import SendIcon from '@mui/icons-material/Send';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {MenuRounded, Search} from '@mui/icons-material';
import {Avatar} from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };
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
              placeholder="Share Token With, View"
            />
            <button>
              <Search />
            </button>
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
              <ToastContainer
                position="top-right"
                autoClose={5001}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover></ToastContainer>
            </ul>
          </menu>
          <MenuRounded className="menu-icon" />
        </nav>
      </section>
    </>
  );
};

export default Header;
