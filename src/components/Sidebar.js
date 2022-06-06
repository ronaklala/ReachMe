import React from 'react';
import './sass/sidebar.scss';
import PeopleIcon from '@mui/icons-material/People';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import GroupsIcon from '@mui/icons-material/Groups';
import {Avatar} from '@mui/material';

const Sidebar = (props) => {
  return (
    <>
      <section className="sidebar">
        <nav>
          <ul>
            <li>
              <a href={'/' + props.wallet}>
                {props.profile_url === null ? (
                  <>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      sx={{width: 26, height: 26}}
                    />
                  </>
                ) : (
                  <>
                    <Avatar
                      alt="Remy Sharp"
                      src={props.profile_url}
                      sx={{width: 26, height: 26}}
                    />
                  </>
                )}

                {props.username}
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
                MarketPlace
              </a>
            </li>
            <li>
              <a href="/groups">
                <GroupsIcon />
                Groups
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
