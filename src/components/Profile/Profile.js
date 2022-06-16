import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import {useParams} from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import ViewProfile from './ViewProfile';

const Profile = () => {
  const [user, setUser] = useState({});

  const uid = useParams();
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  return (
    <>
      {/* {console.log(uid.uid)} */}
      <Header />
      <section className="wrapper">
        <section className="container">
          <Sidebar
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
          <div className="profile-column">
            <ViewProfile
              username={user.username}
              uid={user._id}
              wallet={user.wallet}
              userid={uid.uid}
            />
            <ProfileMenu
              username={user.username}
              uid={user._id}
              wallet={user.wallet}
              userid={uid.uid}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default Profile;
