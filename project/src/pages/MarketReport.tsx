import React from 'react';

function MarketReport() {
  return (
    <div className="min-h-screen bg-black">
      <iframe 
        src="/market-report.html" 
        className="w-full h-screen border-0"
        title="Market Intelligence Report"
      />
    </div>
  );
}

export default MarketReport;