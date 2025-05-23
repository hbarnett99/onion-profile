"use client";

import React from "react";

interface HeaderProps {
  loaded: boolean;
}

const Header: React.FC<HeaderProps> = ({ loaded }) => {
  return (
    <>
      {/* Top Corner Elements */}
      <div className="absolute right-12 lg:right-24">
        <div
          className={`text-sm font-mono opacity-60 transform transition-all duration-1500 ${
            loaded ? "translate-y-0 opacity-60" : "translate-y-5 opacity-0"
          }`}
        >
          {/* Kooyong Yacht Club */}
        </div>
      </div>

      {/* Header Section */}
      <div className="space-y-6 mt-16">
        <div
          className={`transform transition-all duration-1500 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-sm tracking-wider font-light opacity-70 mb-2">
            {/* Kooyong Yacht Club */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
