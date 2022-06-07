import React from 'react';
import './profile.scss';
import {Button} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {Divider} from '@mui/material';

const ProfileMenu = (props) => {
  return (
    <>
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
      <Divider />
      <center>
        <h2>View Profile Also At</h2>
      </center>
      <div className="buttons">
        <a
          href={'https://etherscan.io/address/' + props.wallet}
          target="_blank">
          <Button variant="contained" startIcon={<MonetizationOnIcon />}>
            EtherScan
          </Button>
        </a>
        <a href={'https://bscscan.com/address/' + props.wallet} target="_blank">
          <Button variant="contained" startIcon={<CurrencyPoundIcon />}>
            BscScan
          </Button>
        </a>
        <a
          href={'https://polygonscan.com/address/' + props.wallet}
          target="_blank">
          <Button variant="contained" startIcon={<AttachMoneyIcon />}>
            PolygonScan
          </Button>
        </a>
        <a
          href={'https://snowtrace.io/address/' + props.wallet}
          target="_blank">
          <Button variant="contained" startIcon={<CurrencyExchangeIcon />}>
            SnowTrace
          </Button>
        </a>
      </div>
    </>
  );
};

export default ProfileMenu;
