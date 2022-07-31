/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect, useState} from 'react';
import './products.scss';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Market = (props) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    document.title = 'NFT ShowCase';
    axios.get('https://jinx-social.herokuapp.com/MarketPlace').then((res) => {
      setNfts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <section className="products">
        <Link to="/create-nft">
          <button className="add-nft">Mint Your own NFT Now</button>
        </Link>
        <ul>
          {nfts.map((nft, index) =>
            nft.wallet === props.wallet ? (
              <></>
            ) : (
              <>
                <a href={'/nft/' + nft._id}>
                  <li key={nft._id}>
                    <div className="user-info">
                      {nft.user_details.map((user, index) => (
                        <>
                          {user.profile_url === null ? (
                            <>
                              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                              <span>{user.username} </span>
                            </>
                          ) : (
                            <>
                              <img src={user.profile_url} />
                              <span>{user.username} </span>
                            </>
                          )}
                        </>
                      ))}
                    </div>
                    <img src={nft.image} alt="Nft Image" />
                    <a
                      target="_blank"
                      href={
                        'https://rarible.com/user/' + nft.wallet + '/owned'
                      }>
                      <button>
                        <LocalMallIcon />
                        View On Rarible
                      </button>
                    </a>
                    <span className="greyscale">
                      Minted {moment(nft.createdAt).fromNow()}
                    </span>
                  </li>
                </a>
              </>
            )
          )}
        </ul>
      </section>
    </>
  );
};

export default Market;
