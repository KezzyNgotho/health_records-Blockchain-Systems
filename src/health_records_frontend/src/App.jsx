import React from 'react';
import SplashScreen from './Screens/SplashScreen';
import LoginForm from '../src/LoginForm';
import RegistrationForm from '../src/RegistrationForm';

function App() {
  const path = window.location.pathname;

  const renderPage = () => {
    switch (path) {
      case '/login':
        return <LoginForm />;
      case '/signup':
        return <RegistrationForm />;
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
