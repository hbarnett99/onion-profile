"use client";

import React from "react";

interface CallToActionProps {
  loaded: boolean;
}

const CallToAction: React.FC<CallToActionProps> = ({ loaded }) => {
  return (
    <div
      className={`transform transition-all duration-1500 delay-1500 ${
        loaded ? "translate-y-0 opacity-70" : "translate-y-5 opacity-0"
      }`}
    >
      <div className="text-right space-y-2">
        <div className="text-lg font-mono">LETS TALK SOON</div>
        <div className="text-sm opacity-70 max-w-48">
          UNDER CONSTRUCTION
          <br />
          <div className="text-xs opacity-70">SEE YOU SOON</div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
