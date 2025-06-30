import React from 'react';

function EmailTemplate() {
  return (
    <div className="min-h-screen bg-black">
      <iframe 
        src="/email-template.html" 
        className="w-full h-screen border-0"
        title="Market Intelligence Report"
      />
    </div>
  );
}

export default EmailTemplate;