import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Page404 from './components/Page404';
import CreatePost from './components/posts/CreatePost';
import ViewPosts from './components/posts/ViewPosts';
import Profile from './components/Profile/Profile';
import Comment from './components/Comment';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:uid" element={<ViewPosts />} />
        <Route path="/:uid" element={<Profile />} />
        <Route exact path="*" element={<Page404 msg="404" />} />
        <Route exact path="/error" element={<Page404 msg="403" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
