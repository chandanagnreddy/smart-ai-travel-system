import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Wallet,
  Globe2,
  ShieldCheck,
  FolderHeart,
  Bot,
  GraduationCap,
  Download,
  Menu,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TripPlan } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  studentMode: boolean;
  onToggleStudentMode: () => void;
  onOpenAssistant: () => void;
  onSaveOffline: () => void;
  activeTrip: TripPlan;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  studentMode,
  onToggleStudentMode,
  onOpenAssistant,
  onSaveOffline,
  activeTrip,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'plan', label: 'Plan Trip', icon: MapPin },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'explore', label: 'Explore', icon: Globe2 },
    { id: 'safety', label: 'Safety', icon: ShieldCheck },
    { id: 'mytrips', label: 'My Trips', icon: FolderHeart },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                Smart AI Travel
              </span>
              <span className="hidden md:inline-block ml-2 text-xs font-medium text-teal-400 bg-teal-950/80 border border-teal-800/80 px-2 py-0.5 rounded-full">
                All-in-One
              </span>
              <p className="text-[10px] text-slate-400 hidden sm:block font-normal">
                Plan. Explore. Travel Smarter.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Student Mode, Assistant, Offline */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Student Mode Toggle Button */}
            <button
              id="student-mode-toggle-btn"
              onClick={onToggleStudentMode}
              title="Student Mode creates lower-budget travel plans with student discounts"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                studentMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
              }`}
            >
              <GraduationCap className={`w-3.5 h-3.5 ${studentMode ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span>{studentMode ? 'Student: ON (-35%)' : 'Student Mode'}</span>
            </button>

            {/* Offline Guide Button */}
            <button
              id="save-offline-nav-btn"
              onClick={onSaveOffline}
              title="Save Trip Itinerary & Emergency Contacts for Offline Access"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeTrip.isOfflineSaved
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/70'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {activeTrip.isOfflineSaved ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Download className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden md:inline">{activeTrip.isOfflineSaved ? 'Offline Ready' : 'Save Offline'}</span>
            </button>

            {/* AI Assistant Quick Launcher */}
            <button
              id="open-travel-assistant-btn"
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-md shadow-teal-500/20 transition-all hover:scale-105"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Travel Assistant</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-bounce" />
            </button>
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-assistant-btn"
              onClick={onOpenAssistant}
              className="p-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500"
              title="Open AI Travel Assistant"
            >
              <Bot className="w-5 h-5" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-teal-600/30 text-teal-300 border border-teal-500/40'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              id="mobile-student-mode-btn"
              onClick={() => {
                onToggleStudentMode();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                studentMode
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Student Mode (Budget Friendly)</span>
              </div>
              <span className="text-[11px] font-bold uppercase">{studentMode ? 'Active' : 'Off'}</span>
            </button>

            <button
              id="mobile-offline-save-btn"
              onClick={() => {
                onSaveOffline();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Save Offline Guide</span>
              </div>
              <span className="text-[10px] text-slate-400">{activeTrip.isOfflineSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
