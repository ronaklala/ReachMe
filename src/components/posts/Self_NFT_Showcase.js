import React, {useEffect, useState} from 'react';
import '../MarketPlace/products.scss';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Self_NFT_Showcase = (props) => {
  const [nfts, setNfts] = useState([]);
  const userid = useParams();

  useEffect(() => {
    axios.get('http://localhost:5001/Self-NFT/' + userid.uid).then((res) => {
      setNfts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <section className="products">
        <ul>
          {nfts.map((nft, index) =>
            true === false ? (
              <></>
            ) : (
              <>
                <li key={nft._id}>
                  <div className="user-info"></div>
                  <img src={nft.image} alt="Nft Image" />

                  <div className="buttons">{nft.description}</div>
                  <span className="greyscale">
                    Minted {moment(nft.createdAt).fromNow()}
                  </span>
                </li>
              </>
            )
          )}
        </ul>
      </section>
    </>
  );
};

export default Self_NFT_Showcase;
