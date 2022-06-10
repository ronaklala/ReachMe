import React, {useEffect, useState} from 'react';
import './products.scss';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Icon} from '@iconify/react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Market = (props) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/MarketPlace').then((res) => {
      setNfts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <section className="products">
        <Link to="/create-nft">
          <button className="add-nft">Add You NFT Now</button>
        </Link>
        <ul>
          {nfts.map((nft, index) =>
            nft.username === props.username ? (
              <></>
            ) : (
              <>
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

                  <div className="buttons">{nft.description}</div>
                  <a
                    target="_blank"
                    href={
                      'https://rinkeby.rarible.com/user/' +
                      nft.wallet +
                      '/owned'
                    }>
                    <button>
                      <LocalMallIcon />
                      View On Rarible
                    </button>
                  </a>
                </li>
              </>
            )
          )}
        </ul>
      </section>
    </>
  );
};

export default Market;
