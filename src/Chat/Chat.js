/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import AllUser from './AllUser';
import MessageForm from './MessageForm';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import Message from './Message';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';
import './chat.scss';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState('');
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));

  const user1 = user.wallet;

  useEffect(() => {
    db.collection('users')
      .get()
      .then((snapshot) => {
        const allusers = [];
        snapshot.forEach((doc) => {
          if (doc.data().id !== user.wallet) {
            const data = {
              id: doc.data().id,
              name: doc.data().name,
              email: doc.data().email,
            };
            allusers.push(data);
          }
        });
        setUsers(allusers);
      });
  }, []);

  const selectUser = async (chatuser) => {
    setChat(chatuser);

    const user2 = chatuser.id;
    const id =
      user.wallet > user2 ? `${user.wallet + user2}` : `${user2 + user.wallet}`;

    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, 'lastMsg', id));
    if (docSnap.data() && docSnap.data().from !== user) {
      await updateDoc(doc(db, 'lastMsg', id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.id;
    const id =
      user.wallet > user2 ? `${user.wallet + user2}` : `${user2 + user.wallet}`;

    if (text === '') {
    } else {
      await addDoc(collection(db, 'messages', id, 'chat'), {
        text,
        from: user.wallet,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user.wallet,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
    });

    setText('');
  };

  return (
    <>
      <Header />
      <section className="wrapper">
        <section className="container">
          <Sidebar
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
          <MobileMenu />
          <div className="home_container">
            <div className="users_container">
              {users.map((user) => (
                <AllUser
                  key={user.id}
                  selectUser={selectUser}
                  user={user}
                  user1={user1}
                  chat={chat}
                />
              ))}
            </div>
            <div className="messages_container">
              {chat ? (
                <>
                  <div className="messages_user">
                    <h3>{chat.name}</h3>
                  </div>
                  <div className="messages">
                    {msgs.length
                      ? msgs.map((msg, i) => (
                        <Message key={i} msg={msg} user1={user1} />
                      ))
                      : null}
                  </div>
                  <MessageForm
                    handleSubmit={handleSubmit}
                    text={text}
                    setText={setText}
                  />
                </>
              ) : (
                <h3 className="no_conv">Select a user to start conversation</h3>
              )}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Chat;
