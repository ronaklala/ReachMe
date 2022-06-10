/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import './comment.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';

const Comment = () => {
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
    console.log(comment);
    await axios
      .post('http://localhost:5001/add-comment', comment, axiosConfig)
      .then((res) => {
        console.log(res.status);
        if (res.status == 201) {
          toast.success('Comment Added Successfully', {
            toastId: 1234 + 111,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          console.log(err.message);
          toast.error('Internal Server Error', {
            toastId: 111 + 123,
          });
        }
      });
  };
  return (
    <>
      <div>
        <div className="row">
          <div>
            <div>
              <div className="d-flex flex-column border py-3 my-3">
                <p className="author ps-3 ms-3 text-light">LEAVE A COMMENT</p>
                <form action="POST" className="p-3" onSubmit={handleSubmit}>
                  {/* <div class="form-group py-3">
                    <label
                      className="pb-1 text-light"
                      for="exampleFormControlTextarea1">
                      Comment
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => setContent(e.target.value)}></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn combtn rounded"
                    style={{fontWeight: 'bold'}}>
                    Post Comment
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
