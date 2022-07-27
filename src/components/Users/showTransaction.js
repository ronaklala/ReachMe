import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {useParams} from 'react-router-dom';
const ShowTransaction = (props) => {
  let [loading, setLoading] = useState(true);
  const [trans, settran] = useState([]);
  const wallet = useParams();
  useEffect(() => {
    setTimeout(() => {
      document.title = 'Transactions';
      gettrans();
    }, 500);

    const gettrans = () => {
      axios
        .get('https://jinx-social.herokuapp.com/transcation/' + wallet.uid)
        .then((res) => {
          settran(res.data.doc);
          console.log(res.data.doc);
          setLoading(false);
        });
    };
  }, []);

  return (
    <section className="products">
      {loading === true ? (
        <>
          <center>
            <h1 style={{fontSize: '32px'}}>Loading Transcations</h1>
          </center>
        </>
      ) : (
        <>
          {wallet.uid !== props.id ? (
            (window.location.href = '/error')
          ) : (
            <>
              {trans.length === 0 ? (
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
            </>
          )}
        </>
      )}
    </section>
  );
};

export default ShowTransaction;
