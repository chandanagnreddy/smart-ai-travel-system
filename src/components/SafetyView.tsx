import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  PhoneCall,
  CloudSun,
  HeartPulse,
  Info,
  Download,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';
import { TripPlan } from '../types';

interface SafetyViewProps {
  trip: TripPlan;
  onSaveOffline: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ trip, onSaveOffline }) => {
  const ec = trip.emergencyContacts;

  return (
    <div className="space-y-8">
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Travel Safety & Emergency Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Safety Alerts & Emergency Contacts for {trip.formData.destination}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Essential verified helpline numbers, local scam vigilance, health advisories, and weather forecasts.
            </p>
          </div>

          <button
            id="safety-save-offline-btn"
            onClick={onSaveOffline}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all self-start md:self-center"
          >
            <Download className="w-4 h-4" />
            <span>Save Emergency Kit Offline</span>
          </button>
        </div>

        {/* Demo Disclaimer Banner (MANDATORY REQUIREMENT) */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Transparent Data Notice:</strong> Weather advisories, scam reports, and general precautions shown here are curated travel reference models. They do not constitute live real-time government feeds or radar APIs. Always check official consular notices (e.g. State Dept or embassy) prior to departure.
          </div>
        </div>
      </div>

      {/* Emergency Phone Helplines Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-rose-500" />
          <span>Immediate Emergency Numbers ({trip.formData.destination})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Police */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-rose-500/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Police Dispatch
            </span>
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {ec.police}
            </div>
            <p className="text-[11px] text-slate-500">
              Direct emergency law enforcement dispatch
            </p>
          </div>

          {/* Ambulance / Medical */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-red-500/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Ambulance / Medical
            </span>
            <div className="text-2xl font-black text-red-600 dark:text-red-400">
              {ec.ambulance}
            </div>
            <p className="text-[11px] text-slate-500">
              Urgent medical rescue & paramedic services
            </p>
          </div>

          {/* Tourist Police / Helpline */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-teal-500/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tourist Police / Assistance
            </span>
            <div className="text-base font-black text-teal-600 dark:text-teal-400 truncate">
              {ec.touristPolice}
            </div>
            <p className="text-[11px] text-slate-500">
              Multilingual helpline for international visitors
            </p>
          </div>

          {/* Embassy / Consular */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-blue-500/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Embassy / Consular Service
            </span>
            <div className="text-base font-black text-blue-600 dark:text-blue-400 truncate">
              {ec.embassyHotline}
            </div>
            <p className="text-[11px] text-slate-500">
              Passport loss, legal & citizen emergency aid
            </p>
          </div>
        </div>
      </div>

      {/* Safety Alerts & Advisories */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <span>Travel Precautions & Scam Vigilance</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.safetyAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  alert.category === 'Scam Alert'
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    : alert.category === 'Emergency'
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                    : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                }`}>
                  {alert.category}
                </span>

                {alert.isDemoNotice && (
                  <span className="text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-sm">
                    DEMO ADVISORY
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {alert.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {alert.description}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-[11px] text-slate-600 dark:text-slate-400">
                <strong className="text-teal-600 dark:text-teal-400">Action Tip: </strong>
                {alert.actionTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Travel Security Best Practices */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          General Travel Safety Checklist
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">1. Digital Document Backups</strong>
            <span>Take photos of your passport ID page, visa stamps, and insurance cards, storing encrypted copies in cloud or offline storage.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">2. Payment Security</strong>
            <span>Keep your primary credit card separate from a secondary backup card, and notify your banking app of your foreign travel dates.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">3. Connectivity & Navigation</strong>
            <span>Download offline maps (such as Google Maps offline areas) and keep a pocket power bank charged at all times.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
