import React from 'react';
import EyeLogo from '../components/EyeLogo';

const TerminalPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <EyeLogo className="w-24 h-24 mx-auto" />
        </div>
        <h1 className="text-2xl text-white font-mono tracking-[0.2em]">wire84</h1>
      </div>
    </div>
  );
};

export default TerminalPage;