import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EyeLogo from '../components/EyeLogo';

function LandingPage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/home');
    }, 800);
  };

  return (
    <div 
      className={`min-h-screen bg-black flex flex-col relative overflow-hidden ${
        isExiting ? 'animate-[fadeOut_0.8s_ease-in-out_forwards]' : ''
      }`}
    >
      {/* Background Elements */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center">
          <div 
            className={`mb-12 transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } cursor-pointer group`}
            onClick={handleTransition}
          >
            <div className="relative">
              <EyeLogo className="w-32 h-32 mx-auto transform transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-red-500/10 rounded-full scale-0 group-hover:scale-150 transition-all duration-700 blur-2xl" />
            </div>
          </div>
          
          <h1 
            onClick={handleTransition}
            className={`text-3xl font-mono font-light text-white transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } tracking-[0.2em] cursor-pointer relative inline-block group uppercase`}
          >
            wire84
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-red-500/30 to-orange-500/30 transition-all duration-700 group-hover:w-full" />
          </h1>
        </div>
      </div>
      
      <div 
        className={`pb-16 text-center transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <button 
          onClick={handleTransition}
          className="inline-flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-700 font-mono text-sm tracking-widest group focus:outline-none uppercase relative overflow-hidden"
        >
          <span className="relative z-10">Quantitative Intelligence</span>
          <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-700 inline-block">
            →
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>

      {/* Decorative Lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
      </div>
    </div>
  );
}

export default LandingPage;