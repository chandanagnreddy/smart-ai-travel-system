import React from 'react';
import {
  Download,
  X,
  Printer,
  CheckCircle2,
  PhoneCall,
  Calendar,
  MapPin,
  Utensils,
  Shield,
  WifiOff,
} from 'lucide-react';
import { TripPlan } from '../types';

interface OfflineGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripPlan;
}

export const OfflineGuideModal: React.FC<OfflineGuideModalProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  Offline Travel Guide & Survival Kit
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Ready Without Internet
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {trip.formData.destination} • {trip.formData.days} Days • {trip.formData.travelType} Style
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Print or Save as PDF"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content / Printable Area */}
        <div className="p-6 overflow-y-auto space-y-6 print:p-0">
          {/* Status Badge */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200">
              <strong>Offline Cached:</strong> This travel pack is saved in your local browser storage. You can access it anytime even when airplane mode is on or while roaming abroad without internet connectivity.
            </div>
          </div>

          {/* Critical Emergency Helpline Numbers */}
          <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              <span>Emergency Dispatch Numbers ({trip.formData.destination})</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Police</span>
                <span className="font-black text-slate-900 dark:text-white text-base">
                  {trip.emergencyContacts.police}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Ambulance</span>
                <span className="font-black text-slate-900 dark:text-white text-base">
                  {trip.emergencyContacts.ambulance}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tourist Police</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {trip.emergencyContacts.touristPolice}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Embassy</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {trip.emergencyContacts.embassyHotline}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Itinerary Schedule */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-500" />
              <span>Day-by-Day Route Summary</span>
            </h4>
            <div className="space-y-3">
              {trip.itinerary.map((day) => (
                <div
                  key={day.dayNumber}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>Day {day.dayNumber}: {day.title}</span>
                    <span className="text-teal-600 dark:text-teal-400">Est. ${day.estimatedDailyCost}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div><strong>Morning:</strong> {day.morning.title} ({day.morning.place})</div>
                    <div><strong>Afternoon:</strong> {day.afternoon.title} ({day.afternoon.place})</div>
                    <div><strong>Evening:</strong> {day.evening.title} ({day.evening.place})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Language Survival Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Essential Local Phrases ({trip.localGuide.localLanguage})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {trip.localGuide.keyPhrases.map((kp, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <div className="font-bold text-teal-600 dark:text-teal-400">{kp.phrase}</div>
                  <div className="text-slate-700 dark:text-slate-200">{kp.translation}</div>
                  <div className="text-[10px] text-slate-400">"{kp.pronunciation}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Offline Guide Stored in Local Storage
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
