import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NotYourAverage from './components/NotYourAverage';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import Clients from './components/Clients';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <NotYourAverage />
      <WhyChooseUs />
      <AboutUs />
      <Projects />
      <Clients />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default HomePage;
