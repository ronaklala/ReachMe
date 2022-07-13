import React, {useEffect, useState} from 'react';
import FooterSection from '../FooterSection';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import './supply.scss';
import {toast} from 'react-toastify';
import {db} from '../../firebase';

const Contact = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);

  const [contact, setContact] = useState({
    username: '',
    email: '',
    wallet: '',
    message: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setContact((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    if (
      contact.username === '' ||
      contact.email === '' ||
      contact.message === ''
    ) {
      toast.error('Please fill the whole Form');
    } else {
      contact.wallet = user.wallet;
      db.collection('contact')
        .add({contact})
        .then((res) => {
          toast.success('Message Sent Successfully');
          setContact({
            username: '',
            email: '',
            wallet: '',
            message: '',
          });
        });
    }
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
          <section className="contact">
            <h1>Contact Us Now</h1>
            <div className="inputs">
              <input
                type="text"
                placeholder="Your Username"
                name="username"
                value={contact.username}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Your Email"
                name="email"
                value={contact.email}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              placeholder="Wallet Address"
              disabled
              name="wallet"
              value={user.wallet}
            />
            <textarea
              placeholder="Message / Issue"
              name="message"
              value={contact.message}
              onChange={handleChange}
            />
            <input type="submit" onClick={handleSubmit} />
          </section>
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default Contact;
