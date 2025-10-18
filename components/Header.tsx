import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
  const activeClasses = "bg-sky-500/10 text-sky-300";
  const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200";
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </button>
  );
};

const LogoutIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const logoDataUri = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGIwVFBQXGCIYFhUfISAlIRgjHRsYHCYSFisYIn//2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAHAAcADASIAAhEBAxEB/8QAGwABAQACAwEAAAAAAAAAAAAAAAEFBgIDBAf/xABBEAABAwMBBgQDBgQEBQQDAQABAAIDBBEFBhIhMRNBCFEiUWFxMoGRFFKhsQcWQsEjM1JicqLwFkPh8UNTg5LC0v/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAfEQEBAQEAAwEAAwEBAAAAAAAAAQIREgMhMQRBURP/2gAMAwEBAhEDEQA/APx1CEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIB1D";

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full max-w-4xl mb-8 md:mb-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logoDataUri} alt="KANE Music Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl font-bold text-slate-100 hidden sm:block">
            KANE Music
          </h1>
        </div>
        <nav className="flex items-center space-x-2">
          <NavButton onClick={() => onNavigate('home')} isActive={currentPage === 'home'}>
            Home
          </NavButton>
          <NavButton onClick={() => onNavigate('settings')} isActive={currentPage === 'settings'}>
            Settings
          </NavButton>
          <NavButton onClick={() => onNavigate('inviteFriends')} isActive={currentPage === 'inviteFriends'}>
            Invite Friends
          </NavButton>
          <NavButton onClick={() => onNavigate('support')} isActive={currentPage === 'support'}>
            Support Us
          </NavButton>
          <a
            href="https://www.youtube.com/@Lilpacun"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-slate-600"
            title="Go to YouTube"
            aria-label="Go to YouTube channel"
          >
            YouTube
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-400 hidden md:block">{user?.email}</span>
          <button
            onClick={logout}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            title="Logout"
          >
            <LogoutIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
