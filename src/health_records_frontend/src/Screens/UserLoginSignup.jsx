import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as usermanagement_idl, canisterId as usermanagement_id } from 'dfx-generated/usermanagement';

const agent = new HttpAgent();
const userManagement = Actor.createActor(usermanagement_idl, { agent, canisterId: usermanagement_id });

const UserLoginSignup = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userNationalIdNo, setUserNationalIdNo] = useState('');
  const [userTelNo, setUserTelNo] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState(0);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const user = await userManagement.loginUser(userId);
      // Handle successful login
    } catch (err) {
      setError(err);
    }
  };

  const handleSignup = async () => {
    try {
      await userManagement.addUser(userId, { userName, userNationalIdNo, userTelNo, yearOfBirth });
      // Handle successful signup
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <h2>User Signup</h2>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <input type="text" value={userNationalIdNo} onChange={(e) => setUserNationalIdNo(e.target.value)} />
      <input type="text" value={userTelNo} onChange={(e) => setUserTelNo(e.target.value)} />
      <input type="number" value={yearOfBirth} onChange={(e) => setYearOfBirth(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserLoginSignup;