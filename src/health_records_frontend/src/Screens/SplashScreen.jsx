import React from 'react';
import '../app.scss';
import logoImage from '../assets/icons8-health-100.png'
import animation from "../assets/pexels-cdc-3993212.jpg"
import diabetes from "../assets/icons8-community-100.png"
import fitnes from '../assets/icons8-apple-fitness-80.png'
import welness from '../assets/icons8-people-working-together-80.png'
import { AuthClient } from "@dfinity/auth-client";
//import Button from '@material-ui/core'; 


function LandingPage() {
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: process.env.II_URL,
        onSuccess: () => {
          console.log("Logged in!");
          window.location.href = "/UserManagement"; // Change the URL to navigate to the "/UserManagement" page
        },
      }).catch((error) => {
        console.error("Login failed:", error);
      });
    } catch (error) {
      console.error("AuthClient creation failed:", error);
    }
  };
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo" />
          <h1 className="logo-text">AfyaData</h1>
        </div>
        <div className="links-container">
  <a href="/help" className="header-link">Help</a>
  <a href="/login" className="header-link">Login</a>
  <a href="/signup" className="header-link">Sign Up</a>
</div>

      </header>
      <section className="hero">
  <div className="hero-content">
    <div className="animation-container">
        {/* Animation goes here */}
        {/* For example, you can use an animated SVG or a GIF */}
        {/* Replace the below placeholder with your actual animation */}
        <img src={animation} alt="Health Animation" className="health-animation" />
     
    </div>
    <div className="text-container">
      <h2>Welcome to Your AfyaData</h2>
      <p> The ultimate platform for managing and optimizing your health data effortlessly. With HealthDataHub, you can take control of your health journey like never before, empowering yourself with insights, tools, and resources to lead a healthier and happier life.</p>
      <div className="cta-buttons">
              <a href="#features" className="cta-primary">Learn More</a>
              <button onClick={(event) => handleSignIn(event)} className="cta-primary">
        Login
      </button>
              </div>
    </div>
  </div>
</section>

<section id="features" className="features">
  <h2>Features</h2>
  <div className="feature-list">
    <div className="feature-item">
      <h3>Personalized Health Dashboard</h3>
      <p>Stay informed about your health status with a personalized dashboard that displays key health metrics and trends in real-time.</p>
    </div>
    <div className="feature-item">
      <h3>Health Data Tracking</h3>
      <p>Effortlessly track your health data including daily activities, exercise routines, diet, sleep patterns, and more to gain insights into your overall well-being.</p>
    </div>
    <div className="feature-item">
      <h3>Goal Setting and Progress Monitoring</h3>
      <p>Set personalized health goals and track your progress over time. Receive notifications and reminders to stay motivated and on track towards achieving your health objectives.</p>
    </div>
    <div className="feature-item">
      <h3>Integration with Wearable Devices</h3>
      <p>Sync your health data from wearable devices such as fitness trackers and smartwatches to seamlessly integrate with the platform and enhance your health tracking experience.</p>
    </div>
    <div className="feature-item">
      <h3>Comprehensive Health Reports</h3>
      <p>Generate comprehensive health reports that provide detailed insights into your health trends, patterns, and areas for improvement. Share reports with healthcare professionals for better collaboration and decision-making.</p>
    </div>
  </div>
</section>

<section id="community" className="community">
  <h2>Community</h2>
  <div className="community-grid">
    <div className="community-item">
      <img src={diabetes}alt="Community 1" />
      <div className="community-description">
        <h3>Healthy Living Club</h3>
        <p>Join our Healthy Living Club and connect with like-minded individuals who are dedicated to leading a healthier lifestyle. Share tips, recipes, and motivation to stay on track with your health goals.</p>
        <a href="#" className="community-link">Join Now</a>
      </div>
    </div>
    <div className="community-item">
      <img src={welness} alt="Community 2" />
      <div className="community-description">
        <h3>Wellness Workshops</h3>
        <p>Participate in our Wellness Workshops where experts share valuable insights on nutrition, fitness, mental health, and overall well-being. Gain knowledge and tools to enhance your health journey.</p>
        <a href="#" className="community-link">Learn More</a>
      </div>
    </div>
    <div className="community-item">
      <img src={fitnes} alt="Community 3" />
      <div className="community-description">
        <h3>Fitness Challenges</h3>
        <p>Take on our Fitness Challenges and challenge yourself to reach new fitness heights. Whether it's running, yoga, or strength training, we have challenges to suit every fitness level.</p>
        <a href="#" className="community-link">Get Started</a>
      </div>
    </div>
  </div>
</section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()}  AfyaData. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;