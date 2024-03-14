import React, { useState, useEffect } from 'react';
import '../css/profile.css';
import patientImage from '../assets/icons8-health-64.png';
import { health_records_backend } from '../../../declarations/health_records_backend';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    allergies: [],
    medications: [],
    medicalHistory: [],
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    }
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Implement logic to save changes
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPatientDetails(prevState => ({
        ...prevState,
        [parent]: { ...prevState[parent], [child]: value }
      }));
    } else {
      setPatientDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await usermanagement.getUser('username');  // Replace 'username' with the actual username
        console.log('Fetched user details:', user);
        setPatientDetails({
          firstName: user.userName,
          lastName: user.lastName,
          age: user.yearOfBirth,
          gender: user.gender,
          bloodType: user.bloodType,
          height: user.height,
          weight: user.weight,
          allergies: user.allergies,
          medications: user.medications,
          medicalHistory: user.medicalHistory,
          contactInfo: {
            email: user.userTelNo,
            phone: user.userTelNo,
            address: user.address
          }
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
return (
  <div className="profile-container">
    <div className="profile-header">
      <img src={patientImage} alt="Patient" className="patient-image" />
      <h2>My profile!</h2>
    </div>
    <div className="profile-details">
      <div className="section">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {isEditing ? <input type="text" name="firstName" value={patientDetails.firstName} onChange={handleChange} /> : patientDetails.firstName || 'N/A'} {isEditing ? <input type="text" name="lastName" value={patientDetails.lastName} onChange={handleChange} /> : patientDetails.lastName || 'N/A'}</p>
        <p><strong>Age:</strong> {isEditing ? <input type="number" name="age" value={patientDetails.age} onChange={handleChange} /> : patientDetails.age || 'N/A'}</p>
        <p><strong>Gender:</strong> {isEditing ? <input type="text" name="gender" value={patientDetails.gender} onChange={handleChange} /> : patientDetails.gender || 'N/A'}</p>
        <p><strong>Blood Type:</strong> {isEditing ? <input type="text" name="bloodType" value={patientDetails.bloodType} onChange={handleChange} /> : patientDetails.bloodType || 'N/A'}</p>
        <p><strong>Height:</strong> {isEditing ? <input type="text" name="height" value={patientDetails.height} onChange={handleChange} /> : patientDetails.height || 'N/A'}</p>
        <p><strong>Weight:</strong> {isEditing ? <input type="text" name="weight" value={patientDetails.weight} onChange={handleChange} /> : patientDetails.weight || 'N/A'}</p>
        <p><strong>Allergies:</strong> {isEditing ? <input type="text" name="allergies" value={patientDetails.allergies.join(', ')} onChange={handleChange} /> : patientDetails.allergies.join(', ') || 'N/A'}</p>
        <p><strong>Medications:</strong> {isEditing ? <input type="text" name="medications" value={patientDetails.medications.join(', ')} onChange={handleChange} /> : patientDetails.medications.join(', ') || 'N/A'}</p>
      </div>
      <div className="section">
        <h3>Medical History</h3>
        <ul>
          {patientDetails.medicalHistory.length > 0 ? (
            patientDetails.medicalHistory.map((item, index) => (
              <li key={index}><strong>{item.condition}</strong> (Since: {item.since || 'N/A'})</li>
            ))
          ) : (
            <li>N/A</li>
          )}
        </ul>
      </div>
      <div className="section">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> {isEditing ? <input type="text" name="email" value={patientDetails.contactInfo.email} onChange={handleChange} /> : patientDetails.contactInfo.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {isEditing ? <input type="text" name="phone" value={patientDetails.contactInfo.phone} onChange={handleChange} /> : patientDetails.userTelNo || 'N/A'}</p>
        <p><strong>Address:</strong> {isEditing ? <input type="text" name="address" value={patientDetails.contactInfo.address} onChange={handleChange} /> : patientDetails.contactInfo.address || 'N/A'}</p>
      </div>
    </div>
    <div className="buttons">
      {!isEditing && <button onClick={handleEditClick}>Edit</button>}
      {isEditing && <button onClick={handleSaveClick}>Save</button>}
    </div>
  </div>
);
}

export default Profile;