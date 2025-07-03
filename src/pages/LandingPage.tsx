import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import ProblemSolution from '../components/landing/ProblemSolution';
import HowItWorks from '../components/landing/HowItWorks';
import Benefits from '../components/landing/Benefits';
import UseCases from '../components/landing/UseCases';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-darkbg">
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Benefits />
      <UseCases />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;