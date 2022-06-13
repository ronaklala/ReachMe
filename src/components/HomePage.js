import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './sass/sidebar.scss';
import {SyncLoader} from 'react-spinners';
import {css} from '@emotion/react';
import {Avatar} from '@mui/material';
import {Icon} from '@iconify/react';
import {useMoralis} from 'react-moralis';
import {toast} from 'react-toastify';
import moment from 'moment';
import $ from 'jquery';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HomePage = (props) => {
  const {Moralis, isAuthenticated, authenticate} = useMoralis();

  //Function for if a post has link in it, it will make it redirectable
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

  //Transaction Details
  let [transactionDetails, setTransactionDetails] = useState({
    from: '',
    to: '',
    eth: '',
    hash: '',
    userId: '',
    postId: '',
    txntype: '',
  });

  //Css for Loader / Spinner
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  //User Data
  const [user, setUser] = useState({});

  const [time, setTime] = useState({});
  let [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const today = new Date();

  //Getting Posts from backend and storing in Posts State
  const getPosts = async () => {
    await axios.get('http://localhost:5001/').then((res) => {
      setPosts(res.data.doc);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
    const web3 = Moralis.enableWeb3();
    setTime(today.getHours());
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  //Handling the tip by User and storing it in Backend
  const handleTip = (wallet, id) => {
    return async function () {
      const options = {
        type: 'native',
        amount: Moralis.Units.ETH('0.005'),
        receiver: wallet,
      };
      await Moralis.transfer(options)
        .then(async (txHash) => {
          transactionDetails.from = txHash.from;
          transactionDetails.to = wallet;
          transactionDetails.eth = 0.005;
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
          }, 3000);
        })
        .catch((err) => {
          if (err.code === 'INSUFFICIENT_FUNDS') {
            toast.error('Oops Not Enough Funds', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error('User Denied Transaction', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    };
  };

  //Function for if a post is liked by user
  function isLiked(id) {
    $('#like' + id).hide();
    $('#unlike' + id).show();
  }

  //Function for if a post is not liked by user
  function isunLiked(id) {
    $('#like' + id).show();
    $('#unlike' + id).hide();
  }

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };

  //function for LIKING a post
  const likePost = async (id) => {
    let user_data = {
      post_id: id,
      uid: user._id,
    };

    await axios
      .put(
        'http://localhost:5001/likes',
        JSON.stringify(user_data),
        axiosConfig
      )
      .then((result) => {
        //Increasing Count of Likes by 1 in Front End
        var el = parseInt($('.likes' + id).text());
        $('.likes' + id).text(el + 1);
        //Hiding Like Button and Showing Unlike Button
        $('#like' + id).hide();
        $('#unlike' + id).show();
      })
      .catch((err) => {});
  };

  //function for UNLIKING a post
  const unlikePost = async (id) => {
    let user_data_ = {
      post_id: id,
      uid: user._id,
    };
    await axios
      .put(
        'http://localhost:5001/unlikes',
        JSON.stringify(user_data_),
        axiosConfig
      )
      .then((res) => {
        //Decrementing Count of Likes by 1 in Front End
        var el = parseInt($('.likes' + id).text());
        $('.likes' + id).text(el - 1);
        //Hiding UnLike Button and Showing Like Button
        $('#like' + id).show();
        $('#unlike' + id).hide();
      })
      .catch((err) => {});
  };

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
                    post.token_name !== undefined ? (
                      <>
                        <div
                          className={'post ' + post._id}
                          id={post._id}
                          key={index}>
                          <div className="user-info">
                            {post.user_details.map((user) =>
                              user.profile_url === null ? (
                                <>
                                  <Avatar
                                    alt="Profile Image"
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    sx={{width: 26, height: 26}}
                                    key={user._id}
                                  />
                                </>
                              ) : (
                                <>
                                  <Avatar
                                    alt="Profile Image"
                                    src={user.profile_url}
                                    sx={{width: 26, height: 26}}
                                    key={user._id}
                                  />
                                </>
                              )
                            )}

                            <a style={{color: '#fff'}} href={'/' + post.wallet}>
                              <b>
                                {post.username}
                                <greyscale>
                                  Minted {moment(post.createdAt).fromNow()}
                                </greyscale>
                              </b>
                            </a>
                          </div>
                          <div className="user-caption">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: urlify(post.description),
                              }}></span>
                          </div>
                          {post.image === '' ? (
                            <></>
                          ) : (
                            <>
                              <a href={'#'}>
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
                            {post.username === user.username ? <></> : <></>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={'post ' + post._id}
                          id={post._id}
                          key={index}>
                          <div className="user-info">
                            {post.user_details.map((user) =>
                              user.profile_url === null ? (
                                <>
                                  <Avatar
                                    alt="Profile Image"
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    sx={{width: 26, height: 26}}
                                    key={user._id}
                                  />
                                </>
                              ) : (
                                <>
                                  <Avatar
                                    alt="Profile Image"
                                    src={user.profile_url}
                                    sx={{width: 26, height: 26}}
                                    key={user._id}
                                  />
                                </>
                              )
                            )}

                            <a style={{color: '#fff'}} href={`/${post.wallet}`}>
                              <b>
                                {post.username}
                                <greyscale>
                                  posted {moment(post.createdAt).fromNow()}
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
                              ? isLiked(post._id)
                              : isunLiked(post._id)}

                            <button
                              id={'unlike' + post._id}
                              type="submit"
                              style={{display: 'none'}}
                              onClick={() => {
                                unlikePost(post._id);
                              }}>
                              <FavoriteIcon />
                            </button>

                            <button
                              id={'like' + post._id}
                              type="submit"
                              onClick={() => {
                                likePost(post._id);
                              }}>
                              <FavoriteBorderIcon />
                            </button>
                            {post.username === user.username ? (
                              <></>
                            ) : (
                              <>
                                <button
                                  onClick={handleTip(post.wallet, post._id)}>
                                  Tip 0.005 &nbsp;
                                  <Icon icon="mdi:ethereum" />
                                </button>
                              </>
                            )}
                          </div>

                          <div className="comment-section">
                            {post.likes.length > 0 ? (
                              <>
                                <span class={'likes' + post._id}>
                                  {post.likes.length}
                                </span>
                                Likes
                              </>
                            ) : (
                              <>
                                <span class={'likes' + post._id}>0</span>
                                likes
                              </>
                            )}
                            <span>{post.comment.length} Comments</span>
                            <span>Save</span>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </section>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
