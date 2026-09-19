import React, { useState } from 'react';
import {
  FolderHeart,
  Calendar,
  Wallet,
  Users,
  MapPin,
  Trash2,
  ExternalLink,
  Plus,
  Download,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Clock,
} from 'lucide-react';
import { TripPlan } from '../types';

interface UserDashboardViewProps {
  savedTrips: TripPlan[];
  activeTrip: TripPlan;
  onSelectTrip: (trip: TripPlan) => void;
  onDeleteTrip: (tripId: string) => void;
  onCreateNewTrip: () => void;
  onSaveOffline: (trip: TripPlan) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  savedTrips,
  activeTrip,
  onSelectTrip,
  onDeleteTrip,
  onCreateNewTrip,
  onSaveOffline,
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const totalDays = savedTrips.reduce((acc, t) => acc + t.formData.days, 0);
  const totalBudget = savedTrips.reduce((acc, t) => acc + t.budget.userBudget, 0);

  const handleDownloadJSON = (trip: TripPlan) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trip, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${trip.formData.destination.toLowerCase()}_travel_guide.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold">
              <FolderHeart className="w-3.5 h-3.5" />
              <span>User Travel Dashboard & Offline Vault</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Planned Journeys ({savedTrips.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Manage your saved itineraries, switch between active destinations, or download offline guides for zero-roaming travel.
            </p>
          </div>

          <button
            id="dashboard-new-trip-btn"
            onClick={onCreateNewTrip}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20 transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Journey</span>
          </button>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/60">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Saved Trips
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {savedTrips.length}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Total Travel Days
            </span>
            <div className="text-2xl font-black text-teal-600 dark:text-teal-400">
              {totalDays} days
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Total Allocated Budget
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ${totalBudget.toLocaleString()}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Offline Ready
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {savedTrips.filter((t) => t.isOfflineSaved).length} / {savedTrips.length}
            </div>
          </div>
        </div>
      </div>

      {/* Trips Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          All Saved Itineraries
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => {
            const isActive = trip.id === activeTrip.id;
            return (
              <div
                key={trip.id}
                id={`trip-card-${trip.id}`}
                className={`p-6 rounded-3xl bg-white dark:bg-slate-800/95 border transition-all flex flex-col justify-between space-y-4 ${
                  isActive
                    ? 'border-2 border-teal-500 shadow-lg shadow-teal-500/10'
                    : 'border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                            Active Trip
                          </span>
                        )}
                        {trip.formData.studentMode && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            🎓 Student
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                        {trip.formData.destination}
                      </h4>
                      <div className="text-xs text-slate-500">
                        From {trip.formData.startingLocation || 'Departure Point'} • {trip.formData.days} Days
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900 dark:text-white">
                        ${trip.budget.userBudget.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">Budget Target</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-700/60 text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Travel Style</span>
                      <span className="font-semibold">{trip.formData.travelType} ({trip.formData.travelers} pax)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Departure Date</span>
                      <span className="font-semibold">{trip.formData.travelDate}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {trip.formData.interests.map((int, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      >
                        {int}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Offline Toggle/Download */}
                    <button
                      onClick={() => onSaveOffline(trip)}
                      className={`p-2 rounded-xl text-xs transition-colors ${
                        trip.isOfflineSaved
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
                          : 'text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-700'
                      }`}
                      title="Save for offline usage"
                    >
                      {trip.isOfflineSaved ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleDownloadJSON(trip)}
                      className="p-2 rounded-xl text-xs text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-700"
                      title="Export complete travel plan as JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {/* Delete Confirmation */}
                    {confirmDeleteId === trip.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onDeleteTrip(trip.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-600 text-white"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1 rounded-lg text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(trip.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 bg-slate-100 dark:bg-slate-700"
                        title="Delete trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {!isActive && (
                    <button
                      onClick={() => onSelectTrip(trip)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-xs transition-all flex items-center gap-1"
                    >
                      <span>Open Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
