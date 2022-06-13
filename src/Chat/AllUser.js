/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import userIm from './../assets/user.png';
import {onSnapshot, doc} from 'firebase/firestore';
import {db} from './../firebase';

const AllUser = ({user1, user, selectUser, chat}) => {
  const user2 = user.id;
  const [data, setData] = useState('');

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper txtf ${
          chat.name === user.name && 'selected_user'
        }`}
        onClick={() => selectUser(user)}>
        <div className="user_info">
          <div className="user_detail">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
              className="avatar"
            />
            <h4>{user.name}</h4>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
        </div>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? 'Me:' : 'New:'}</strong>
            {data.text}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${
          chat.name === user.name && 'selected_user'
        }`}>
        <img src={userIm} alt="avatar" className="avatar sm_screen" />
      </div>
    </>
  );
};

export default AllUser;
