import React, { useState } from 'react';
import '../css/profile.css';
import patientImage from '../assets/icons8-health-64.png';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    firstName: 'John',
    lastName: 'Doe',
    age: 35,
    gender: 'Male',
    bloodType: 'A+',
    height: '180 cm',
    weight: '75 kg',
    allergies: ['Peanuts', 'Penicillin'],
    medications: ['Aspirin', 'Lisinopril'],
    medicalHistory: [
      { condition: 'Hypertension', since: '2015' },
      { condition: 'Diabetes', since: '2018' },
      { condition: 'Asthma', since: 'Childhood' }
    ],
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St, City, Country'
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
    setPatientDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={patientImage} alt="Patient" className="patient-image" />
        <h2>My profile!</h2>
      </div>
      <div className="profile-details">
        <div className="section">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {isEditing ? <input type="text" name="firstName" value={patientDetails.firstName} onChange={handleChange} /> : patientDetails.firstName} {isEditing ? <input type="text" name="lastName" value={patientDetails.lastName} onChange={handleChange} /> : patientDetails.lastName}</p>
          <p><strong>Age:</strong> {isEditing ? <input type="number" name="age" value={patientDetails.age} onChange={handleChange} /> : patientDetails.age}</p>
          <p><strong>Gender:</strong> {isEditing ? <input type="text" name="gender" value={patientDetails.gender} onChange={handleChange} /> : patientDetails.gender}</p>
          <p><strong>Blood Type:</strong> {isEditing ? <input type="text" name="bloodType" value={patientDetails.bloodType} onChange={handleChange} /> : patientDetails.bloodType}</p>
          <p><strong>Height:</strong> {isEditing ? <input type="text" name="height" value={patientDetails.height} onChange={handleChange} /> : patientDetails.height}</p>
          <p><strong>Weight:</strong> {isEditing ? <input type="text" name="weight" value={patientDetails.weight} onChange={handleChange} /> : patientDetails.weight}</p>
          <p><strong>Allergies:</strong> {isEditing ? <input type="text" name="allergies" value={patientDetails.allergies.join(', ')} onChange={handleChange} /> : patientDetails.allergies.join(', ')}</p>
          <p><strong>Medications:</strong> {isEditing ? <input type="text" name="medications" value={patientDetails.medications.join(', ')} onChange={handleChange} /> : patientDetails.medications.join(', ')}</p>
        </div>
        <div className="section">
          <h3>Medical History</h3>
          <ul>
            {patientDetails.medicalHistory.map((item, index) => (
              <li key={index}><strong>{item.condition}</strong> (Since: {item.since})</li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {isEditing ? <input type="text" name="email" value={patientDetails.contactInfo.email} onChange={handleChange} /> : patientDetails.contactInfo.email}</p>
          <p><strong>Phone:</strong> {isEditing ? <input type="text" name="phone" value={patientDetails.contactInfo.phone} onChange={handleChange} /> : patientDetails.contactInfo.phone}</p>
          <p><strong>Address:</strong> {isEditing ? <input type="text" name="address" value={patientDetails.contactInfo.address} onChange={handleChange} /> : patientDetails.contactInfo.address}</p>
        </div>
      </div>
      <div className="buttons">
        {!isEditing && <button onClick={handleEditClick}>Edit</button>}
        {isEditing && <button onClick={handleSaveClick}>Save</button>}
      </div>
    </div>
  );
};

export default Profile;
