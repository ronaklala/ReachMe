import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './sass/sidebar.scss';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
import {Avatar} from '@mui/material';
import {Icon} from '@iconify/react';
import {useMoralis, useWeb3Transfer} from 'react-moralis';
import {toast} from 'react-toastify';
import moment from 'moment';
import { post } from 'jquery';

const HomePage = (props) => {
  const {Moralis, isAuthenticated} = useMoralis();

  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, function (url) {
      var hyperlink = url;
      if (!hyperlink.match('^https?://')) {
        hyperlink = 'http://' + hyperlink;
      }
      return (
        '<a className="blue" href="' +
        url +
        '" rel="noopener" noreferrer>' +
        url +
        '</a>'
      );
    });
    // or alternatively
  }

  let [transactionDetails, setTransactionDetails] = useState({
    from: '',
    to: '',
    eth: '',
    hash: '',
    userId: '',
    postId: '',
    txntype: '',
  });

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const [user, setUser] = useState({});

  const [time, setTime] = useState({});
  let [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const today = new Date();

  useEffect(() => {
    const web3 = Moralis.enableWeb3();
    getPosts();
    setTime(today.getHours());
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  const getPosts = async () => {
    await axios.get('http://localhost:5001/').then((res) => {
      setPosts(res.data.doc);
      console.log(res)
      setLoading(false);
    });
  };

  const handleTip = (wallet, id) => {
    return async function () {
      const options = {
        type: 'native',
        amount: Moralis.Units.ETH('0.05'),
        receiver: wallet,
      };
      await Moralis.transfer(options)
        .then(async (txHash) => {
          transactionDetails.from = txHash.from;
          transactionDetails.to = wallet;
          transactionDetails.eth = 0.05;
          transactionDetails.hash = txHash.hash;
          transactionDetails.userId = user._id;
          transactionDetails.postId = id;
          transactionDetails.txntype = 'Tip';
        })
        .then(async () => {
          toast.success('Transaction Initiated', {
            toastId: 1 + 1,
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            console.log(transactionDetails);
            axios.post('http://localhost:5001/user_tip', transactionDetails);
          }, 5000);
        })
        .catch((err) => {
          toast.error('User Denied Transaction', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
  };

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };

  //function for LIKING a post
  const likePost = async (id)=>{
    let user_data = {
      post_id: id,
      uid:user._id,
    }
     await axios.put('http://localhost:5001/likes',JSON.stringify(user_data),axiosConfig)
     .then(result=> {         
      // console.log(result.data._id)
      const newData = posts.map(item=>{
        if(item._id==result.data._id){
          return result.data
        }else{
          return item
        }
      })
      // setlikeCount(newData)
      // console.log(setlikeCount)
     }).catch((err) => {
       console.log(err);
     })
  }

    //function for UNLIKING a post
    const unlikePost = async (id)=>{
      let user_data_ = {
        post_id: id,
        uid:user._id,
      }  
       await axios.put('http://localhost:5001/unlikes',JSON.stringify(user_data_),axiosConfig).then((res) => {
        console.log(res)
       }).catch((err) => {
         console.log(err);
       })
    }

  return (
    <>
      <div>
        <section className="home">
          <div className="greetings">
            {time <= 12 ? (
              <>
                <span>
                  <b>Good Morning, {props.username}</b>
                  <a href="/create-post">
                    <button>Make A Post</button>
                  </a>
                </span>
                <text>Hope You are having a good day</text>
              </>
            ) : (
              <>
                <span>
                  <b>Good Evening, {props.username}</b>
                  <a href="/create-post">
                    <button>Make A Post</button>
                  </a>
                </span>
                <text>Hope You are having a good day</text>
              </>
            )}
          </div>
        </section>
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
                <h2>Loading Posts......</h2>
              </center>
            </div>
          </>
        ) : (
          <>
            <div className="grid-container">
              <div className="grid post-parent">
                {posts.length == 0 ? (
                  <>
                    <h1>No Posts Found For Your Wallet</h1>
                    <a href="/create-post">
                      <button>Create One Now</button>
                    </a>
                  </>
                ) : (
                  <>
                    <section className="posts-section">
                      {posts.map((post, index) =>
                        post.username !== user.username ? (
                          <>
                            <div
                              className={'post ' + post._id}
                              id={post._id}
                              key={index}>
                              <div className="user-info">
                                {post.user_details.map((user) => (
                                  <Avatar
                                    alt="Profile Image"
                                    src={user.profile_url}
                                    sx={{width: 26, height: 26}}
                                    key={user._id}
                                  />
                                ))}

                                <a
                                  style={{color: '#fff'}}
                                  href={`/${post.wallet}`}>
                                  <b>
                                    {post.username}
                                    <greyscale>
                                      posted on{' '}
                                      {moment(post.createdAt).format('LLL')}
                                    </greyscale>
                                  </b>
                                </a>
                              </div>
                              <div className="user-caption">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: urlify(post.caption),
                                  }}></span>
                              </div>
                              {post.image === '' ? (
                                <></>
                              ) : (
                                <>
                                  <a href={`/post/${post._id}`}>
                                    {' '}
                                    <img
                                      alt="Post Image"
                                      src={post.image}
                                      className="post-image"
                                    />
                                  </a>
                                </>
                              )}

                              <div className="buttons">
                              {post.likes.includes(user._id)
                               ? <button onClick={()=> {unlikePost(post._id)}}>
                                  UnLike
                                 </button>
                               :
                                <button 
                                  onClick={()=> {likePost(post._id)}}>
                                  Like
                                </button>
                              }
                                {/* <button 
                                  onClick={()=> {likePost(post._id)}}>
                                  Like
                                </button>
                                <button onClick={()=> {unlikePost(post._id)}}>
                                  UnLike
                                </button> */}

                                <button
                                  onClick={handleTip(post.wallet, post._id)}>
                                  Tip 0.05 &nbsp;
                                  <Icon icon="mdi:ethereum" />
                                </button>
                              </div>

                              <div className="comment-section">
                                {post.likes.length > 0 ?
                                  <span>{post.likes.length} likes</span>
                                  : <span>0 likes</span>
                                }                                
                                <span>View All Comments</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )
                      )}
                    </section>

                    {/* <ul>
                     
                    </ul> */}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
