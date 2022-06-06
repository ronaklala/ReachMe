import React from 'react';
import './profile.scss';

const ProfileMenu = (props) => {
  return (
    <ul>
      <a href={'/' + props.wallet}>
        <li>Profile</li>
      </a>
      <a href={'/activity/' + props.wallet}>
        <li>Activity</li>
      </a>
      <a href={'/posts/' + props.wallet}>
        <li>Posts</li>
      </a>
      <a href={'/followers/' + props.wallet}>
        <li>Followers</li>
      </a>
      <a href={'/transactions/' + props.wallet}>
        <li>Transactions</li>
      </a>
    </ul>
  );
};

export default ProfileMenu;
