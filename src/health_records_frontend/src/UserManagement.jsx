import React, { useState } from 'react';
import { health_records_backend } from "../../declarations/health_records_backend";

const UserManagement = () => {
  const [username, setUsername] = useState('');
  const [userNationalIdNo, setUserNationalIdNo] = useState('');
  const [userTelNo, setUserTelNo] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState(0);
  const [contributionDestination, setContributionDestination] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const addUser = async () => {
    try {
      // Check if the user already exists
      const userExists = await health_records_backend.userExists(username);
      if (userExists) {
        setRegistrationError("User already exists. Please choose a different username.");
      } else {
        const payload = { 
          userName: username, 
          userNationalIdNo: userNationalIdNo, 
          userTelNo: userTelNo, 
          yearOfBirth, 
          contributionDestination: contributionDestination 
        };
        console.log("Adding user with payload:", payload); // Log the payload
        await health_records_backend.addUser(payload);
        console.log("User added successfully");
        // Redirect to the landing page after adding the user
        window.location.href = "/Dashboard";
      }
    } catch (error) {
      console.error("Failed to add user:", error);
      setRegistrationError("Failed to add user. Please try again.");
    }
  }
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setRegistrationError(''); // Clear the registration error when the username changes
  }

  const handleNationalIdChange = (e) => {
    setUserNationalIdNo(e.target.value);
    setRegistrationError('');
  }

  const handleTelNoChange = (e) => {
    setUserTelNo(e.target.value);
    setRegistrationError('');
  }

  const handleYearOfBirthChange = (e) => {
    setYearOfBirth(e.target.value);
    setRegistrationError('');
  }

  const handleContributionDestinationChange = (e) => {
    setContributionDestination(e.target.value);
    setRegistrationError('');
  }

  return (
    <div>
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
      <input type="text" value={userNationalIdNo} onChange={handleNationalIdChange} placeholder="National ID" />
      <input type="text" value={userTelNo} onChange={handleTelNoChange} placeholder="Telephone Number" />
      <input type="number" value={yearOfBirth} onChange={handleYearOfBirthChange} placeholder="Year of Birth" />
      <input type="text" value={contributionDestination} onChange={handleContributionDestinationChange} placeholder="Contribution Destination" />
      <button onClick={addUser}>Register</button>
      {registrationError && <p>{registrationError}</p>}
    </div>
  );
};

export default UserManagement;