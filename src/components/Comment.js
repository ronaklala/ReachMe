/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';
import './sass/comments.scss';
import $ from 'jquery';

const Comment = (props) => {
  const postid = useParams();
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);
  const [content, setContent] = useState('');
  const [comment, setComment] = useState({
    content: '',
    user: '',
    postId: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    comment.postId = postid.postid;
    comment.content = content;
    comment.user = user._id;
    if (comment.content === '') {
      toast.error('Cant Add empty Comment', {
        toastId: 'comment empty',
      });
    } else {
      await axios
        .post(
          'https://jinx-social.herokuapp.com/add-comment',
          comment,
          axiosConfig
        )
        .then((res) => {
          if (res.status == 200) {
            toast.success('Comment Added Successfully', {
              toastId: 1234 + 111,
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            $('.comment').val('');
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error('Internal Server Error', {
              toastId: 111 + 123,
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
    }
  };
  return (
    <>
      <div className="d-flex flex-column border py-3 my-3">
        <form action="POST" onSubmit={handleSubmit}>
          <div class="form-group py-3">
            <input
              type="text"
              class="comment"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn combtn rounded"
            style={{fontWeight: 'bold'}}>
            Post Comment
          </button>
        </form>
      </div>
    </>
  );
};

export default Comment;
