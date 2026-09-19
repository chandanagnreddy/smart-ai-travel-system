import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { TripPlannerForm } from './components/TripPlannerForm';
import { ItineraryView } from './components/ItineraryView';
import { BudgetPlannerView } from './components/BudgetPlannerView';
import { ExploreView } from './components/ExploreView';
import { SafetyView } from './components/SafetyView';
import { UserDashboardView } from './components/UserDashboardView';
import { AITravelAssistantDrawer } from './components/AITravelAssistantDrawer';
import { OfflineGuideModal } from './components/OfflineGuideModal';
import {
  TripPlan,
  TripFormData,
  DayItinerary,
  BudgetBreakdown,
} from './types';
import { generateCompleteTripPlan } from './data/destinations';
import {
  loadActiveTrip,
  saveActiveTrip,
  loadSavedTrips,
  saveTripToStorage,
  deleteTripFromStorage,
  toggleOfflineStatus,
} from './utils/storage';
import { CheckCircle2, Sparkles, Bot, GraduationCap } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [studentMode, setStudentMode] = useState<boolean>(false);
  const [activeTrip, setActiveTrip] = useState<TripPlan>(() => loadActiveTrip());
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>(() => loadSavedTrips());
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync active trip & student mode state
  useEffect(() => {
    if (activeTrip.formData.studentMode !== studentMode) {
      setStudentMode(activeTrip.formData.studentMode);
    }
  }, [activeTrip.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleStudentMode = () => {
    const newMode = !studentMode;
    setStudentMode(newMode);

    // Regenerate active trip with updated student mode setting
    const updatedForm: TripFormData = {
      ...activeTrip.formData,
      studentMode: newMode,
      // If student mode enabled, set accommodation to Hostel/Budget if user had luxury
      accommodationPref: newMode && activeTrip.formData.accommodationPref === 'Luxury Resort'
        ? 'Hostel/Budget'
        : activeTrip.formData.accommodationPref,
    };

    const updatedTrip = generateCompleteTripPlan(updatedForm);
    updatedTrip.id = activeTrip.id; // Keep same trip ID
    setActiveTrip(updatedTrip);
    saveActiveTrip(updatedTrip);
    setSavedTrips(loadSavedTrips());

    showToast(
      newMode
        ? '🎓 Student Mode Activated! Budget discounted ~35% with youth hostels & student transit passes.'
        : 'Student Mode Deactivated. Standard travel rates restored.'
    );
  };

  const handlePlanSubmit = (formData: TripFormData) => {
    setIsGenerating(true);
    // Simulate smart AI synthesis delay
    setTimeout(() => {
      const newTrip = generateCompleteTripPlan(formData);
      setActiveTrip(newTrip);
      saveActiveTrip(newTrip);
      saveTripToStorage(newTrip);
      setSavedTrips(loadSavedTrips());
      setIsGenerating(false);
      setCurrentTab('itinerary');
      showToast(`✨ Generated complete trip plan for ${formData.destination}!`);
    }, 600);
  };

  const handleQuickDestination = (destName: string) => {
    const newForm: TripFormData = {
      ...activeTrip.formData,
      destination: destName,
      studentMode: studentMode,
    };
    const newTrip = generateCompleteTripPlan(newForm);
    setActiveTrip(newTrip);
    saveActiveTrip(newTrip);
    saveTripToStorage(newTrip);
    setSavedTrips(loadSavedTrips());
    setCurrentTab('itinerary');
    showToast(`Loaded ${destName} itinerary & budget plan!`);
  };

  const handleUpdateItinerary = (updatedItinerary: DayItinerary[]) => {
    const updatedTrip = {
      ...activeTrip,
      itinerary: updatedItinerary,
    };
    setActiveTrip(updatedTrip);
    saveActiveTrip(updatedTrip);
    saveTripToStorage(updatedTrip);
    setSavedTrips(loadSavedTrips());
    showToast('Itinerary details successfully updated.');
  };

  const handleRegenerateAll = () => {
    const refreshedTrip = generateCompleteTripPlan(activeTrip.formData);
    refreshedTrip.id = activeTrip.id;
    setActiveTrip(refreshedTrip);
    saveActiveTrip(refreshedTrip);
    saveTripToStorage(refreshedTrip);
    setSavedTrips(loadSavedTrips());
    showToast('Itinerary refreshed with newly balanced activity routes.');
  };

  const handleUpdateBudget = (updatedBudget: BudgetBreakdown) => {
    const updatedTrip = {
      ...activeTrip,
      budget: updatedBudget,
    };
    setActiveTrip(updatedTrip);
    saveActiveTrip(updatedTrip);
    saveTripToStorage(updatedTrip);
    setSavedTrips(loadSavedTrips());
    showToast('Budget forecast updated.');
  };

  const handleSaveOffline = (tripToSave?: TripPlan) => {
    const target = tripToSave || activeTrip;
    const isNowOffline = toggleOfflineStatus(target.id);
    const updatedTrip = { ...target, isOfflineSaved: isNowOffline };

    if (target.id === activeTrip.id) {
      setActiveTrip(updatedTrip);
      saveActiveTrip(updatedTrip);
    }
    setSavedTrips(loadSavedTrips());
    setIsOfflineModalOpen(true);
    showToast(
      isNowOffline
        ? '📥 Guide saved offline! You can access it without roaming or Wi-Fi.'
        : 'Offline guide status updated.'
    );
  };

  const handleDeleteTrip = (tripId: string) => {
    deleteTripFromStorage(tripId);
    const remaining = loadSavedTrips();
    setSavedTrips(remaining);

    if (activeTrip.id === tripId) {
      if (remaining.length > 0) {
        setActiveTrip(remaining[0]);
        saveActiveTrip(remaining[0]);
      } else {
        const fresh = generateCompleteTripPlan({
          destination: 'Tokyo',
          startingLocation: 'San Francisco, CA',
          days: 5,
          travelDate: new Date().toISOString().split('T')[0],
          travelers: 1,
          totalBudget: 1800,
          currency: 'USD',
          travelType: 'Solo',
          interests: ['Culture', 'Food', 'History'],
          preferredTransport: 'Local Transport',
          accommodationPref: 'Boutique Hotel',
          foodPref: 'Local Street Food',
          studentMode: false,
        });
        setActiveTrip(fresh);
        saveActiveTrip(fresh);
        saveTripToStorage(fresh);
        setSavedTrips(loadSavedTrips());
      }
    }
    showToast('Trip deleted from dashboard.');
  };

  const handleSelectTrip = (trip: TripPlan) => {
    setActiveTrip(trip);
    saveActiveTrip(trip);
    setCurrentTab('itinerary');
    showToast(`Switched active trip to ${trip.formData.destination}.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Persistent Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        studentMode={studentMode}
        onToggleStudentMode={handleToggleStudentMode}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onSaveOffline={() => handleSaveOffline()}
        activeTrip={activeTrip}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900/95 dark:bg-white text-white dark:text-slate-950 border border-slate-700 dark:border-slate-300 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Sparkles className="w-4 h-4 text-teal-400 dark:text-teal-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Active Trip Quick Sub-Header (when viewing plan, itinerary, budget, explore, safety) */}
      {currentTab !== 'home' && (
        <div className="bg-white dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 py-2.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Active Trip:</span>
              <span className="font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                📍 {activeTrip.formData.destination}
              </span>
              <span className="text-slate-500 hidden sm:inline">
                ({activeTrip.formData.days} days • {activeTrip.formData.travelType} • ${activeTrip.budget.userBudget})
              </span>
              {activeTrip.formData.studentMode && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                  🎓 Student Mode Active
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="header-switch-trip-btn"
                onClick={() => setCurrentTab('mytrips')}
                className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Switch / Manage Trips ({savedTrips.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 1. Home Page */}
        {currentTab === 'home' && (
          <HomePage
            onPlanTripClick={() => setCurrentTab('plan')}
            onExploreClick={() => {
              const featSec = document.getElementById('features-overview-section');
              if (featSec) {
                featSec.scrollIntoView({ behavior: 'smooth' });
              } else {
                setCurrentTab('explore');
              }
            }}
            onQuickDestination={handleQuickDestination}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            studentMode={studentMode}
            onToggleStudentMode={handleToggleStudentMode}
          />
        )}

        {/* 2. Trip Planner Form */}
        {currentTab === 'plan' && (
          <TripPlannerForm
            initialValues={activeTrip.formData}
            onSubmit={handlePlanSubmit}
            isGenerating={isGenerating}
          />
        )}

        {/* 3. AI Itinerary View */}
        {currentTab === 'itinerary' && (
          <ItineraryView
            trip={activeTrip}
            onUpdateItinerary={handleUpdateItinerary}
            onRegenerateAll={handleRegenerateAll}
            onAskAIAboutDay={(dayNum) => {
              setIsAssistantOpen(true);
            }}
            onExportOffline={() => handleSaveOffline()}
          />
        )}

        {/* 4. Budget Planner View */}
        {currentTab === 'budget' && (
          <BudgetPlannerView
            trip={activeTrip}
            onUpdateBudget={handleUpdateBudget}
            onToggleStudentMode={handleToggleStudentMode}
            onAskAIHowToSave={() => setIsAssistantOpen(true)}
          />
        )}

        {/* 5, 6, 7. Explore: Accommodation, Transportation, Food & Local Guide */}
        {currentTab === 'explore' && (
          <ExploreView
            trip={activeTrip}
            onAskAI={(query) => {
              setIsAssistantOpen(true);
            }}
          />
        )}

        {/* 8. Safety & Emergency Center */}
        {currentTab === 'safety' && (
          <SafetyView
            trip={activeTrip}
            onSaveOffline={() => handleSaveOffline()}
          />
        )}

        {/* 10, 12. User Dashboard & Offline Guides Vault */}
        {currentTab === 'mytrips' && (
          <UserDashboardView
            savedTrips={savedTrips}
            activeTrip={activeTrip}
            onSelectTrip={handleSelectTrip}
            onDeleteTrip={handleDeleteTrip}
            onCreateNewTrip={() => setCurrentTab('plan')}
            onSaveOffline={handleSaveOffline}
          />
        )}
      </main>

      {/* Slide-out AI Travel Assistant Drawer */}
      <AITravelAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        activeTrip={activeTrip}
      />

      {/* Offline Guide & Printable Modal */}
      <OfflineGuideModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        trip={activeTrip}
      />

      {/* Modern Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-black text-slate-900 dark:text-white">Smart AI Travel System</span>
            <span>— Plan. Explore. Travel Smarter.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button onClick={() => setCurrentTab('home')} className="hover:text-slate-900 dark:hover:text-white">Home</button>
            <button onClick={() => setCurrentTab('plan')} className="hover:text-slate-900 dark:hover:text-white">Planner</button>
            <button onClick={() => setCurrentTab('itinerary')} className="hover:text-slate-900 dark:hover:text-white">Itinerary</button>
            <button onClick={() => setCurrentTab('budget')} className="hover:text-slate-900 dark:hover:text-white">Budget</button>
            <button onClick={() => setCurrentTab('explore')} className="hover:text-slate-900 dark:hover:text-white">Explore</button>
            <button onClick={() => setCurrentTab('safety')} className="hover:text-slate-900 dark:hover:text-white">Safety</button>
            <button onClick={() => setCurrentTab('mytrips')} className="hover:text-slate-900 dark:hover:text-white">Dashboard</button>
          </div>

          <div className="text-[11px] text-slate-400">
            Demo data clearly identified • Offline cached locally
          </div>
        </div>
      </footer>
    </div>
  );
}
