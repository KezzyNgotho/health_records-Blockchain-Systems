import React from 'react';
import SplashScreen from './Screens/SplashScreen';
import Dashboard from '../src/Screens/PatientDashboard';

import UserManagement from './UserManagement';
function App() {



  const path = window.location.pathname;

  const renderPage = () => {
    switch (path) {
      case '/Dashboard':
        return <Dashboard />;
        case '/UserManagement':
          return <UserManagement />;
       
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