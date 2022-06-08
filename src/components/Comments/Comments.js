import React from 'react';
import './Comments.css';

// import { format } from 'timeago.js';

const Comments = ({ comments }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-5" style={{ border: '0' }}>
            <div className="comments  py-4" style={{ marginTop: '-32%' }}>
              <p
                className="author ps-3 ms-3 text-light"
                style={{
                  position: 'relative',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  fontFamily: 'sans-serif',
                  paddingLeft: '20px',
                }}
              >
                TOP COMMENTS
              </p>

              <div className="d-flex flex-row flex-wrap">

                {/* {comments.map((comment) => (
            <div className="col-lg-6 col-md-6 col-sm-12 pb-3">
              <div className="d-flex flex-row single-post flex-wrap col-12">
                <div className="px-3 col-lg-12 col-md-12 col-sm-12">
                  <div className="d-inline-flex justify-content-between">
                    <p className="popular-blog-comment pb-1 mb-0">
                      <span
                        style={{
                          fontWeight: 'bold',

                          fontFamily: 'sans-serif',
                          fontSize: '1rem',
                        }}
                      >
                        {comment.name}
                      </span>
                    </p>
                  </div>
                  <p className=" pt-0 mt-0 pb-1 mb-0">
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {comment.comment}
                    </span>
                  </p>
                  <div className="d-flex">
                    <p
                      className="pt-0 mt-0 pe-2"
                      style={{ fontSize: '0.85rem' }}
                    >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))} */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
