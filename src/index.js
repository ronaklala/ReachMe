/* eslint-disable react/jsx-pascal-case */
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
import MarketPlace from './components/MarketPlace/MarketPlace';
import Transcation from './components/Users/Transcation';
import Chat from './Chat/Chat';
import Showcase from './components/posts/Showcase';
import UserSearch from './components/posts/UserSearch';
import Groups from './components/Groups/Groups';
import Create_Group from './components/Groups/Create_Group';
import SingleGroup from './components/Groups/SingleGroup';
import SingleGroupMemberList from './components/Groups/SingleGroupMemberList';
import GroupPosts from './components/Groups/GroupPosts';
import Saved_post from './components/Saved/Saved_post';
import Followers from './components/Users/Followers';
import UpdateProfile from './components/Users/UpdateProfile';
import SingleNFT from './components/MarketPlace/SingleNFT';
import SingleGroupPost from './components/Groups/SingleGroupPost';
import ViewSinglePostComments from './components/Comments/ViewSinglePostComments';
import About from './components/Docs/About';
import Contact from './components/Docs/Contact';
import BuyCrpto from './components/Crypto/BuyCrpto';
import Docs from './components/Docs/Docs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MoralisProvider
        appId="8HCIsqfbqINlv1MIEEXWvMg7i3AzOxUBw3uZx8MH"
        serverUrl="https://55pvnkfokjbd.usemoralis.com:2053/server">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/MarketPlace" element={<MarketPlace />} />
          <Route path="/create-Nft" element={<AddNftpage />} />

          <Route path="/saved-post/:username" element={<Saved_post />} />
          <Route path="/search/" element={<UserSearch />} />
          <Route path="/posts/:uid" element={<ViewPosts />} />
          <Route path="/:uid" element={<Profile />} />
          <Route path="/search/:search" element={<UserSearch />} />
          <Route path="/post/:postid" element={<SinglePost />} />
          <Route path="/users" element={<Users />} />
          <Route path="/showcase-nft/:uid" element={<Showcase />} />
          <Route path="/transcation/:uid" element={<Transcation />} />
          <Route path="/nft/:nftid" element={<SingleNFT />} />
          <Route exact path="*" element={<Page404 msg="404" />} />
          <Route exact path="/error" element={<Page404 msg="403" />} />
          <Route exact path="/messages" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/create-group" element={<Create_Group />} />
          <Route path="/group/:gid" element={<SingleGroup />} />
          <Route path="/followers/:uid" element={<Followers />} />
          <Route path="/gpost/:pid" element={<SingleGroupPost />} />
          <Route
            path="/post/:postid/comments"
            element={<ViewSinglePostComments />}
          />
          <Route
            path="/group/:gid/members"
            element={<SingleGroupMemberList />}
          />
          <Route path="/buy-crypto" element={<BuyCrpto />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/group/:gid/posts" element={<GroupPosts />} />
          <Route path="/updateProfile/:uid" element={<UpdateProfile />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </MoralisProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
