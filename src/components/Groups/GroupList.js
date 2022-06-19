/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './groups.scss';

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/groups').then((res) => {
      setGroups(res.data);
    });
  }, []);

  return (
    <>
      <section className="groups">
        <br />
        <a href="/create-group">
          <button>Create Your Own Group Now</button>
        </a>
        <ul>
          {groups.length !== 0 ? (
            <>
              {groups.map((group, index) => (
                <>
                  <li>
                    <div className="user">
                      <div
                        className="user-profile"
                        style={{ backgroundColor: '#6d71e3' }}>
                        {group.image === null ? (
                          <>
                            <img src="https://pbs.twimg.com/profile_images/857490466572443648/c05JqEgo_400x400.jpg" />
                          </>
                        ) : (
                          <>
                            <img src={group.image} />
                          </>
                        )}
                      </div>
                      <div className="user-info">
                        <span>{group.name}</span>
                        <span>{group.username}</span>
                        <div className="counts">
                          <span></span>
                          <span>
                            {group.members.length}
                            <br />
                            Members
                          </span>
                        </div>
                        <center>
                          <a href={`/group/` + group._id}>
                            <button>View Group</button>
                          </a>
                        </center>
                      </div>
                    </div>
                  </li>
                </>
              ))}
            </>
          ) : (
            <>
              <h1>No Groups Found</h1>
            </>
          )}
        </ul>
      </section>
    </>
  );
};

export default GroupList;
