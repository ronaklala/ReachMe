
import React from "react";
import logo from "./images/logo.png";
import './comment.css';
const Comment = () => {
  return (
    <>
    <div className="commentpage">
     
    <img className="logo" alt="not loded" src={logo}></img>
    <h1 className="username">helo</h1>
    </div>
    <div className="comments">
    <p className="user">username</p>
    <p className="value">heloabdbbxjhsxaj</p>
    
    
      </div>
    <div className="inputbox">
      <input className="inputtext" placeholder="Comment" type ="text"/>
      <button className="button">Post</button>
      </div>
    </>
  );
};

export default Comment;