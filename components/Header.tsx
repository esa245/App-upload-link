
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            ↑
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">App On The Go</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-orange-500 transition-colors">Pricing</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Documentation</a>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-black transition-all">
            Dashboard
          </button>
        </nav>
        <button className="md:hidden p-2 text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
