import React from 'react';
import './sass/sidebar.scss';
import PeopleIcon from '@mui/icons-material/People';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import GroupsIcon from '@mui/icons-material/Groups';
import {Avatar} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

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
                      alt="Profile Image"
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
              <a href={'/saved-post/' + props.username}>
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
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
