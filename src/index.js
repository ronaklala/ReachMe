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
import SinglePost from './components/posts/SinglePost';
import Users from './components/Users/Users';
import {MoralisProvider} from 'react-moralis';
import Comment from './components/Comment';
import AddNftpage from './components/MarketPlace/AddNftpage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <MoralisProvider
  appId="n19572pX5K7PJen1TcnEDizQaDnMQxf7zgAmDnoh"
  serverUrl="https://ya7rkwykqzkd.usemoralis.com:2053/server">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/marketplace" element={<AddNftpage />} />
        <Route path="/posts/:uid" element={<ViewPosts />} />
        <Route path="/:uid" element={<Profile />} />
        <Route path="/p-self/:postid" element={<SinglePost />} />
        <Route path="/users" element={<Users />} />
        <Route exact path="*" element={<Page404 msg="404" />} />
        <Route exact path="/error" element={<Page404 msg="403" />} />
      </Routes>
      </MoralisProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
