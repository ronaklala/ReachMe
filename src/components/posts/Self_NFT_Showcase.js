/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect, useState} from 'react';
import '../MarketPlace/products.scss';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Self_NFT_Showcase = (props) => {
  const [nfts, setNfts] = useState([]);
  const userid = useParams();

  useEffect(() => {
    axios
      .get('https://jinx-social.herokuapp.com/Self-NFT/' + userid.uid)
      .then((res) => {
        setNfts(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <>
      <section className="products">
        <ul>
          {nfts.length === 0 ? (
            <>
              <center style={{width: '100%', marginTop: '20px'}}>
                <img
                  src="https://res.cloudinary.com/ronaklala-games/image/upload/v1657799759/posts/Untitled_design_1_lfhe7e.gif"
                  height={250}
                />
                <h1 style={{color: '#fff', fontSize: '36px'}}>
                  No NFTs Minted Tll Now
                </h1>
              </center>
            </>
          ) : (
            <>
              {nfts.map((nft, index) =>
                true === false ? (
                  <></>
                ) : (
                  <>
                    <a href={'/nft/' + nft._id}>
                      <li key={nft._id}>
                        <div className="user-info"></div>
                        <img src={nft.image} alt="Nft Image" />
                        <span className="greyscale">
                          Minted {moment(nft.createdAt).fromNow()}
                        </span>
                      </li>
                    </a>
                  </>
                )
              )}
            </>
          )}
        </ul>
      </section>
    </>
  );
};

export default Self_NFT_Showcase;
