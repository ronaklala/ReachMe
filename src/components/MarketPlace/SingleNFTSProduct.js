import {Avatar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
import moment from 'moment';

const SingleNFTSProduct = () => {
  const [nft, setNft] = useState({});
  const [loading, setLoading] = useState(true);
  const url = useParams();
  useEffect(() => {
    getNftData();
  }, []);

  const getNftData = async () => {
    await axios
      .get('https://jinx-social.herokuapp.com/getsinglenft/' + url.nftid)
      .then((res) => {
        setNft(res.data[0]);
        setLoading(false);
      });
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  if (nft !== undefined) {
    document.title = nft.token_name + ' - JinX NFT';
  } else {
    document.title = 'Not Found - JinX NFT';
  }

  return (
    <>
      {loading === true ? (
        <>
          <div className="spinner">
            <center>
              <br />
              <SyncLoader
                color="#ffffff"
                loading={loading}
                css={override}
                size={50}
              />
              <br />
              <h2>Loading NFT Data......</h2>
            </center>
          </div>
        </>
      ) : (
        <>
          {nft === undefined ? (
            <>
              <center>
                <h1>NFT Not Found</h1>
              </center>
            </>
          ) : (
            <>
              <section className="single-nft">
                <div className="nft-image">
                  <img src={nft.image} alt={nft.image} />
                </div>
                <div className="info">
                  <div className="user-info">
                    {nft.user_details.map((user, index) =>
                      user.profile_url === null ? (
                        <>
                          <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                        </>
                      ) : (
                        <>
                          <Avatar src={user.profile_url} />
                        </>
                      )
                    )}

                    {nft.username}
                  </div>
                  <span>{nft.token_name}</span>
                  <span>{nft.description}</span>
                  <greyscale>
                    Minted {moment(nft.createdAt).fromNow()}
                  </greyscale>
                  <a
                    href={'https://rarible.com/user/' + nft.wallet + '/owned'}
                    target="_blank"
                    rel="noreferrer">
                    <button>View On Rarible</button>
                  </a>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SingleNFTSProduct;
