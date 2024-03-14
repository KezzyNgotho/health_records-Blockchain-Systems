import React, { useState } from 'react';
import '../css/Dashboard.css';
import logo from '../assets/icons8-health-100.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faTachometerAlt, faCog, faCalendarAlt, faHeartbeat, faChartBar, faCalendarCheck, faPrescriptionBottleAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import OverviewSection from '../components/Overview';
import AppointmentsSection from '../components/Appointments';
import PatientsSection from '../components/PatientsSection';  // Import PatientsSection
import ReportsSection from '../components/Reports';
import NotificationsSection from '../components/Notifications';
import SettingsSection from '../components/Settings';
import Profile from '../components/Profile';

const sectionComponents = {
  overview: OverviewSection,
  appointments: AppointmentsSection,
  patients: PatientsSection,  // Include PatientsSection in sectionComponents
  reports: ReportsSection,
  notifications: NotificationsSection,
  settings: SettingsSection,
  profile: Profile
};

const DoctorsDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const ActiveSectionComponent = sectionComponents[activeSection];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <nav>
          <ul>
            <li><a href="/overview" onClick={() => handleSectionClick('overview')}><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</a></li>
            <li><a href="/settings" onClick={() => handleSectionClick('settings')}><FontAwesomeIcon icon={faCog} /> Settings</a></li>
            <li><a href="/calendar" onClick={() => handleSectionClick('calendar')}><FontAwesomeIcon icon={faCalendarAlt} /> Calendar</a></li>
            <li><a href="/PatientsSection" onClick={() => handleSectionClick('patients')}><FontAwesomeIcon icon={faHeartbeat} /> Patients</a></li>
            <li><a href="/reports" onClick={() => handleSectionClick('reports')}><FontAwesomeIcon icon={faChartBar} /> Reports</a></li>
            <li><a href="/appointments" onClick={() => handleSectionClick('appointments')}><FontAwesomeIcon icon={faCalendarCheck} /> Appointments</a></li>
            <li><a href="/logout" onClick={() => handleSectionClick('logout')}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Body */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <header className="dashboard-topbar">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <h1>AfyaData</h1>
          </div>
          <nav>
            <ul>
              <li><a href="/profile" onClick={() => handleSectionClick('profile')}><FontAwesomeIcon icon={faUser} /> Profile</a></li>
              <li><a href="/notifications" onClick={() => handleSectionClick('notifications')}><FontAwesomeIcon icon={faBell} /> Notifications</a></li>
              <li><a href="/logout" onClick={() => handleSectionClick('logout')}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a></li>
            </ul>
          </nav>
        </header>

        {/* Sections */}
        <ActiveSectionComponent />
      </main>
    </div>
  );
};

export default DoctorsDashboard;