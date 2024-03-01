import React from 'react';
import RegistrationForm from './RegistrationForm';
import HealthRecordUploadForm from './HealthRecordUploadForm';
import AccessControlManagement from './AccessControlManagement';
import TokenRewards from './TokenRewards';

function Dashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <header>
        <h1>Health Management System - Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
      <main>
        <div className="dashboard-content">
          <RegistrationForm />
          <HealthRecordUploadForm />
          <AccessControlManagement />
          <TokenRewards />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
