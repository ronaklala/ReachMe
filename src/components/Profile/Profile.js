import React, {useEffect, useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ProfileMenu from './ProfileMenu';
import ViewProfile from './ViewProfile';

const Profile = () => {
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
          <div className="profile-column">
            <ViewProfile />
            <ProfileMenu username={user.username} wallet={user.wallet} />
          </div>
        </section>
      </section>
    </>
  );
};

export default Profile;
