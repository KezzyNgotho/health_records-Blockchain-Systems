import React, { useState } from 'react';

function HealthRecordUploadForm() {
  const [healthRecord, setHealthRecord] = useState('');

  const handleChange = (e) => {
    setHealthRecord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your health record upload logic here
    console.log('Health record uploaded:', healthRecord);
  };

  return (
    <div>
      <h2>Health Record Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Health Record:
          <textarea value={healthRecord} onChange={handleChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default HealthRecordUploadForm;
