import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import ResponsiveImageGallery from "./components/Section1"
import BannerGallery from "./components/Section2"
import HealthCheckupPackages from "./components/Section3"
import ImageWithTitleDisplay from "./components/Secton4"
import WhatToSay from './components/Section5';
import FAQSection from './components/Section6';
import LabFeatures from './components/Section7';

function App() {
  return (
    <div className="App">
      <MainComponent />
      <ResponsiveImageGallery />
      <BannerGallery />
      <HealthCheckupPackages/>
      <ImageWithTitleDisplay/>
      <WhatToSay/>
      <FAQSection/>
      <LabFeatures/>
    </div>
  );
}

export default App;
