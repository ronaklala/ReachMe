/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './users.scss';
import moment from 'moment';
import MobileMenu from '../MobileMenu';
import FooterSection from '../FooterSection';

const Transcation = () => {
  let [loading, setLoading] = useState(true);
  const [trans, settran] = useState([]);

  const wallet = useParams();
  useEffect(() => {
    gettrans();
  }, []);

  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  const gettrans = async () => {
    if (wallet.uid !== user._id) {
      window.location.href = '/error';
    } else {
      await axios
        .get('https://jinx-social.herokuapp.com/transcation/' + wallet.uid)
        .then((res) => {
          settran(res.data.doc);
          setLoading(false);
        });
    }
  };

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
          <MobileMenu />
          <section className="products">
            {trans.length == 0 ? (
              <>
                <div>
                  <h1 style={{fontSize: '32px'}}>
                    No Transcation Found For this user
                  </h1>
                </div>
              </>
            ) : (
              <>
                <table>
                  <tr>
                    <th>From Wallet</th>
                    <th>To Wallet</th>
                    <th>Eth Value</th>
                    <th>Hash</th>
                    <th>Type</th>
                    <th>Transaction Done</th>
                  </tr>
                  {trans.map((txn, index) => (
                    <tr>
                      <td>{txn.from}</td>
                      <td>{txn.to}</td>
                      <td>{txn.eth}</td>
                      <td>{txn.hash}</td>
                      <td>{txn.txntype}</td>
                      <td>{moment(txn.createdAt).fromNow()}</td>
                    </tr>
                  ))}
                </table>
              </>
            )}
          </section>
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default Transcation;
