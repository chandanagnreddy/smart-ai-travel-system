import React, { useState } from 'react';
import {
  Calendar,
  Sun,
  Sunset,
  Moon,
  MapPin,
  Clock,
  DollarSign,
  Utensils,
  RefreshCw,
  Edit3,
  Check,
  Bot,
  Sparkles,
  Download,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TripPlan, DayItinerary, DayActivity } from '../types';

interface ItineraryViewProps {
  trip: TripPlan;
  onUpdateItinerary: (updatedItinerary: DayItinerary[]) => void;
  onRegenerateAll: () => void;
  onAskAIAboutDay: (dayNum: number) => void;
  onExportOffline: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  trip,
  onUpdateItinerary,
  onRegenerateAll,
  onAskAIAboutDay,
  onExportOffline,
}) => {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingDay, setEditingDay] = useState<DayItinerary | null>(null);

  const currentDay = trip.itinerary.find((d) => d.dayNumber === selectedDayNum) || trip.itinerary[0];

  const handleStartEdit = (day: DayItinerary) => {
    setEditingDay(JSON.parse(JSON.stringify(day)));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editingDay) return;
    const updated = trip.itinerary.map((d) => (d.dayNumber === editingDay.dayNumber ? editingDay : d));
    onUpdateItinerary(updated);
    setIsEditing(false);
    setEditingDay(null);
  };

  const handleRegenerateSingleDay = (dayNum: number) => {
    // Regenerate variations for this day
    const updated = trip.itinerary.map((d) => {
      if (d.dayNumber !== dayNum) return d;
      return {
        ...d,
        morning: {
          ...d.morning,
          title: `Alternative Morning: Scenic Heritage Walk in ${trip.formData.destination}`,
          description: `Discovered a refreshed route through quiet artisan side-streets, historic courtyards, and local coffee counters.`,
        },
        afternoon: {
          ...d.afternoon,
          title: `Alternative Afternoon: Contemporary Gallery & Scenic Lookout`,
          description: `Visit the cultural district's modern installations followed by panoramic city views.`,
        },
        evening: {
          ...d.evening,
          title: `Alternative Evening: Twilight Food Alley Crawl`,
          description: `Sample skewered regional favorites and local desserts at lively street stalls.`,
        },
      };
    });
    onUpdateItinerary(updated);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5" />
            <span>AI-Crafted Day-by-Day Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {trip.formData.days}-Day Itinerary for {trip.formData.destination}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Paced for {trip.formData.travelType} travelers with an interest in {trip.formData.interests.join(', ')}.
            {trip.formData.studentMode && ' Optimized for Student Budget discounts.'}
          </p>
        </div>

        {/* Global Itinerary Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="itinerary-regenerate-all-btn"
            onClick={onRegenerateAll}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
            title="Re-synthesize all days with fresh activities"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate Plan</span>
          </button>

          <button
            id="itinerary-export-offline-btn"
            onClick={onExportOffline}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm shadow-teal-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Offline</span>
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {trip.itinerary.map((day) => {
          const isSelected = selectedDayNum === day.dayNumber;
          return (
            <button
              key={day.dayNumber}
              id={`day-tab-${day.dayNumber}`}
              onClick={() => {
                setSelectedDayNum(day.dayNumber);
                setIsEditing(false);
              }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-80">Day {day.dayNumber}</div>
              <div className="truncate max-w-[120px]">{day.theme.split('&')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Day View Card */}
      {currentDay && (
        <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-md space-y-8">
          {/* Day Title & Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-black uppercase bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Day {currentDay.dayNumber}
                </span>
                <span className="text-xs text-slate-500">
                  Est. Travel Time: {currentDay.estimatedTravelTime}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {currentDay.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                id={`ask-ai-day-${currentDay.dayNumber}-btn`}
                onClick={() => onAskAIAboutDay(currentDay.dayNumber)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI about Day {currentDay.dayNumber}</span>
              </button>

              <button
                id={`regen-day-${currentDay.dayNumber}-btn`}
                onClick={() => handleRegenerateSingleDay(currentDay.dayNumber)}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                title="Regenerate this specific day"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                id={`edit-day-${currentDay.dayNumber}-btn`}
                onClick={() => handleStartEdit(currentDay)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Day'}</span>
              </button>
            </div>
          </div>

          {/* Inline Edit Mode or Display Mode */}
          {isEditing && editingDay ? (
            <div className="space-y-6 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-teal-500/30">
              <h4 className="text-sm font-bold text-teal-600 dark:text-teal-300">
                Modify Day {editingDay.dayNumber} Details
              </h4>

              <div className="space-y-4">
                {/* Morning Activity Edit */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Morning Activity Title</label>
                  <input
                    type="text"
                    value={editingDay.morning.title}
                    onChange={(e) =>
                      setEditingDay({
                        ...editingDay,
                        morning: { ...editingDay.morning, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                  <textarea
                    rows={2}
                    value={editingDay.morning.description}
                    onChange={(e) =>
                      setEditingDay({
                        ...editingDay,
                        morning: { ...editingDay.morning, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 mt-1"
                  />
                </div>

                {/* Afternoon Activity Edit */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Afternoon Activity Title</label>
                  <input
                    type="text"
                    value={editingDay.afternoon.title}
                    onChange={(e) =>
                      setEditingDay({
                        ...editingDay,
                        afternoon: { ...editingDay.afternoon, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                  <textarea
                    rows={2}
                    value={editingDay.afternoon.description}
                    onChange={(e) =>
                      setEditingDay({
                        ...editingDay,
                        afternoon: { ...editingDay.afternoon, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 mt-1"
                  />
                </div>

                {/* Evening Activity Edit */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Evening Activity Title</label>
                  <input
                    type="text"
                    value={editingDay.evening.title}
                    onChange={(e) =>
                      setEditingDay({
                        ...editingDay,
                        evening: { ...editingDay.evening, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                  />
                  <textarea
                    rows={2}
                    value={editingDay.evening.description}
                    onChange={(e) =>
                      setEditingDay({
                        ...editingDay,
                        evening: { ...editingDay.evening, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  id="save-day-edit-btn"
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Day Activity Cards (Morning, Afternoon, Evening) */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Morning Card */}
              <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-4 h-4" />
                      <span>Morning</span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{currentDay.morning.time}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {currentDay.morning.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentDay.morning.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-500/20 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span className="truncate max-w-[140px]">{currentDay.morning.place}</span>
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Est. ${currentDay.morning.estimatedCost}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{currentDay.morning.travelTime}</span>
                  </div>
                  {currentDay.morning.studentSavingNote && (
                    <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/15 p-1 rounded-md">
                      🎓 {currentDay.morning.studentSavingNote}
                    </div>
                  )}
                </div>
              </div>

              {/* Afternoon Card */}
              <div className="p-5 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <Sunset className="w-4 h-4" />
                      <span>Afternoon</span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{currentDay.afternoon.time}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {currentDay.afternoon.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentDay.afternoon.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-blue-500/20 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span className="truncate max-w-[140px]">{currentDay.afternoon.place}</span>
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Est. ${currentDay.afternoon.estimatedCost}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{currentDay.afternoon.travelTime}</span>
                  </div>
                  {currentDay.afternoon.studentSavingNote && (
                    <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-500/15 p-1 rounded-md">
                      🎓 {currentDay.afternoon.studentSavingNote}
                    </div>
                  )}
                </div>
              </div>

              {/* Evening Card */}
              <div className="p-5 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-400">
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-4 h-4" />
                      <span>Evening</span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{currentDay.evening.time}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {currentDay.evening.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentDay.evening.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-indigo-500/20 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="truncate max-w-[140px]">{currentDay.evening.place}</span>
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Est. ${currentDay.evening.estimatedCost}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{currentDay.evening.travelTime}</span>
                  </div>
                  {currentDay.evening.studentSavingNote && (
                    <div className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-500/15 p-1 rounded-md">
                      🎓 {currentDay.evening.studentSavingNote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Meals & Places Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {/* Suggested Food for the day */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-emerald-500" />
                  <span>Curated Daily Meals</span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                  ~${currentDay.suggestedFood.estimatedFoodCost} total
                </span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <li><strong className="text-slate-700 dark:text-slate-200">Breakfast:</strong> {currentDay.suggestedFood.breakfast}</li>
                <li><strong className="text-slate-700 dark:text-slate-200">Lunch:</strong> {currentDay.suggestedFood.lunch}</li>
                <li><strong className="text-slate-700 dark:text-slate-200">Dinner:</strong> {currentDay.suggestedFood.dinner}</li>
              </ul>
            </div>

            {/* Places to visit list & daily cost */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  <span>Places to Visit</span>
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-extrabold">
                  Est. Daily Cost: ${currentDay.estimatedDailyCost}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentDay.placesToVisit.map((place, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    📍 {place}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                {currentDay.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
