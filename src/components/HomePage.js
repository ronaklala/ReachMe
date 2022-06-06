import React, {useEffect, useState} from 'react';
import './sass/sidebar.scss';

const HomePage = (props) => {
  const [time, setTime] = useState({});
  const today = new Date();
  useEffect(() => {
    setTime(today.getHours());
  }, []);

  return (
    <>
      <section className="home">
        <div className="greetings">
          {time <= 12 ? (
            <>
              <span>
                <b>Good Morning, {props.username}</b>
                <a href="/create-post">
                  <button>Make A Post</button>
                </a>
              </span>
              <text>Hope You are having a good day</text>
            </>
          ) : (
            <>
              <span>
                <b>Good Evening, {props.username}</b>
                <a href="/create-post">
                  <button>Make A Post</button>
                </a>
              </span>
              <text>Hope You are having a good day</text>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
