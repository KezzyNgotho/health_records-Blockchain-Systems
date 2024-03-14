import React from 'react';
import SplashScreen from './Screens/SplashScreen';
import Dashboard from '../src/Screens/PatientDashboard';
import SettingsSection from './components/Settings';
import UserManagement from './UserManagement';
import Profile from './components/Profile';
import DoctorsDashboard from './Screens/DoctorsDashboard';
import PatientsSection from './components/PatientsSection';
function App() {



  const path = window.location.pathname;

  const renderPage = () => {
    switch (path) {
      case '/Dashboard':
        return <Dashboard />;
        case '/UserManagement':
          return <UserManagement />;
          case '/Profile':
            return <Profile />;
            case '/DoctorsDashboard':
        return <DoctorsDashboard />;
        case '/PatientsSection':
        return <PatientsSection/>;
           
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;