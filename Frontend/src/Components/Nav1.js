import React from 'react';

const Nav1 = ({ user }) => {
  return (
    <nav>
      <div>Logo</div>
      <div>
        {user ? (
          <div>
            <img
              src={user.photoURL}
              alt="Profile"
              style={{ width: '40px', borderRadius: '50%' }}
            />
            <span>{user.name}</span>
          </div>
        ) : (
          <span>Login to see profile</span>
        )}
      </div>
    </nav>
  );
};

export default Nav1;
