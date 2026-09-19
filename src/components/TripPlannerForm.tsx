import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  Sparkles,
  Plane,
  Train,
  Bus,
  Car,
  BedDouble,
  Utensils,
  GraduationCap,
  Shield,
  Check,
  Building,
  Heart,
  UserCheck,
} from 'lucide-react';
import {
  TripFormData,
  TravelType,
  InterestType,
  TransportPreference,
  AccommodationPreference,
  FoodPreference,
} from '../types';

interface TripPlannerFormProps {
  initialValues: TripFormData;
  onSubmit: (data: TripFormData) => void;
  isGenerating?: boolean;
}

const POPULAR_QUICK_DESTS = [
  'Tokyo, Japan',
  'Paris, France',
  'Bali, Indonesia',
  'New York, USA',
  'Rome, Italy',
  'London, UK',
  'Bangkok, Thailand',
  'Barcelona, Spain',
  'Dubai, UAE',
  'Swiss Alps, Switzerland',
];

const TRAVEL_TYPES: { type: TravelType; label: string; desc: string }[] = [
  { type: 'Solo', label: 'Solo Traveler', desc: 'Freedom to explore at your own rhythm' },
  { type: 'Couple', label: 'Couple / Duo', desc: 'Romantic spots, scenic dining & cozy stays' },
  { type: 'Friends', label: 'Friends Group', desc: 'Nightlife, shared villas & fun adventures' },
  { type: 'Family', label: 'Family Trip', desc: 'Kid-friendly sights, relaxed pace & comfort' },
];

const INTERESTS_LIST: { id: InterestType; label: string; icon: string }[] = [
  { id: 'Nature', label: 'Nature & Parks', icon: '🌲' },
  { id: 'Adventure', label: 'Adventure & Outdoor', icon: '🧗' },
  { id: 'History', label: 'History & Heritage', icon: '🏛️' },
  { id: 'Shopping', label: 'Shopping & Bazaars', icon: '🛍️' },
  { id: 'Food', label: 'Food & Street Eats', icon: '🍜' },
  { id: 'Culture', label: 'Culture & Arts', icon: '🎭' },
  { id: 'Entertainment', label: 'Entertainment & Night', icon: '✨' },
];

const TRANSPORTS: { id: TransportPreference; label: string; icon: any }[] = [
  { id: 'Local Transport', label: 'Local Transit (Metro/Bus)', icon: Train },
  { id: 'Train', label: 'Rail / High-Speed Train', icon: Train },
  { id: 'Flight', label: 'Flight', icon: Plane },
  { id: 'Bus', label: 'Intercity Bus / Coach', icon: Bus },
  { id: 'Cab', label: 'Cab / Private Driver', icon: Car },
];

const ACCOMMODATIONS: { id: AccommodationPreference; label: string; desc: string; studentBest?: boolean }[] = [
  { id: 'Hostel/Budget', label: 'Hostel / Budget Stay', desc: 'Social atmosphere, shared or private pods ($25–$50)', studentBest: true },
  { id: 'Boutique Hotel', label: 'Boutique / Mid-Scale Hotel', desc: 'Comfortable, stylish, central location ($85–$150)' },
  { id: 'Luxury Resort', label: 'Luxury Resort & Spa', desc: 'Full-service wellness, pools, prime dining ($200+)' },
  { id: 'Vacation Rental', label: 'Vacation Rental / Apartment', desc: 'Kitchen facilities, space for groups ($70–$140)' },
];

const FOOD_PREFS: { id: FoodPreference; label: string; desc: string }[] = [
  { id: 'Local Street Food', label: 'Local Street Food & Markets', desc: 'Authentic flavors, budget-friendly and lively' },
  { id: 'Mixed/Everything', label: 'Mixed / Local & International', desc: 'Balanced variety across cafes and bistros' },
  { id: 'Vegetarian/Vegan', label: 'Vegetarian / Vegan Friendly', desc: 'Plant-based specialties and organic produce' },
  { id: 'Halal', label: 'Halal Certified Food', desc: 'Strict dietary adherence with certified dining' },
  { id: 'Fine Dining', label: 'Fine Dining & Gastronomy', desc: 'Curated tasting menus and chef tables' },
];

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  initialValues,
  onSubmit,
  isGenerating = false,
}) => {
  const [formData, setFormData] = useState<TripFormData>(initialValues);

  const handleInterestToggle = (interest: InterestType) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        if (prev.interests.length <= 1) return prev; // Keep at least 1
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      }
      return { ...prev, interests: [...prev.interests, interest] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination.trim()) {
      alert('Please enter a destination to plan your trip.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Trip Generator</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Plan Your Complete Personalized Journey
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Specify your travel style, requirements, and budget. Our AI synthesizes your customized itinerary, budget model, lodging, transit, and emergency guide.
        </p>
      </div>

      {/* Main Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-10 shadow-xl space-y-10"
      >
        {/* Student Mode Highlight Toggle */}
        <div
          id="planner-student-mode-box"
          onClick={() => setFormData((p) => ({ ...p, studentMode: !p.studentMode }))}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
            formData.studentMode
              ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white shadow-sm'
              : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.studentMode ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">Student Mode</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 uppercase tracking-wide">
                  Save 25% – 35%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Prioritizes youth hostels, free attraction days, student transit discounts, and cheap eats.
              </p>
            </div>
          </div>

          <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden"
               style={{ backgroundColor: formData.studentMode ? '#f59e0b' : '#94a3b8' }}>
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                formData.studentMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        {/* Section 1: Route & Dates */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2">
            <MapPin className="w-4 h-4 text-teal-500" />
            <span>1. Destination & Logistics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Destination Input */}
            <div className="space-y-1.5">
              <label htmlFor="planner-dest-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Destination <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="planner-dest-input"
                  type="text"
                  required
                  placeholder="e.g., Tokyo, Paris, Bali, London..."
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-medium outline-hidden"
                />
              </div>

              {/* Quick suggestions pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 self-center">Popular:</span>
                {POPULAR_QUICK_DESTS.slice(0, 5).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setFormData({ ...formData, destination: q.split(',')[0] })}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-teal-500 hover:text-white transition-colors"
                  >
                    {q.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Location */}
            <div className="space-y-1.5">
              <label htmlFor="planner-origin-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Starting Location (City or Airport)
              </label>
              <input
                id="planner-origin-input"
                type="text"
                placeholder="e.g., San Francisco, New York, Delhi, London..."
                value={formData.startingLocation}
                onChange={(e) => setFormData({ ...formData, startingLocation: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-medium outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Number of Days */}
            <div className="space-y-1.5">
              <label htmlFor="planner-days-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Number of Days ({formData.days} days)
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="planner-days-input"
                  type="range"
                  min="1"
                  max="14"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400 w-8 text-center">
                  {formData.days}d
                </span>
              </div>
            </div>

            {/* Travel Date */}
            <div className="space-y-1.5">
              <label htmlFor="planner-date-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Departure Date
              </label>
              <input
                id="planner-date-input"
                type="date"
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Number of Travelers */}
            <div className="space-y-1.5">
              <label htmlFor="planner-travelers-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Travelers ({formData.travelers} {formData.travelers === 1 ? 'person' : 'people'})
              </label>
              <select
                id="planner-travelers-input"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Solo Traveler' : `${num} Travelers`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Budget & Style */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2">
            <Wallet className="w-4 h-4 text-teal-500" />
            <span>2. Budget & Travel Style</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total Budget */}
            <div className="space-y-1.5">
              <label htmlFor="planner-budget-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Total Budget (Approximate)
              </label>
              <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-600 focus-within:ring-2 focus-within:ring-teal-500">
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value as any })}
                  className="bg-slate-100 dark:bg-slate-700 px-3 text-xs font-bold text-slate-700 dark:text-slate-200 outline-hidden border-r border-slate-300 dark:border-slate-600"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
                <input
                  id="planner-budget-input"
                  type="number"
                  min="200"
                  step="50"
                  placeholder="1500"
                  value={formData.totalBudget}
                  onChange={(e) => setFormData({ ...formData, totalBudget: parseInt(e.target.value) || 500 })}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold outline-hidden"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {formData.studentMode
                  ? 'Recommended student budget: $60–$100 per day total.'
                  : 'Recommended standard budget: $150–$300 per day total.'}
              </p>
            </div>

            {/* Travel Type Cards */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Travel Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TRAVEL_TYPES.map((item) => {
                  const isSelected = formData.travelType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      id={`travel-type-${item.type.toLowerCase()}`}
                      onClick={() => setFormData({ ...formData, travelType: item.type })}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-950 dark:text-teal-200 font-bold'
                          : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Interests & Activities */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-500" />
              <span>3. Interests & Activities (Choose 1 or more)</span>
            </h3>
            <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
              {formData.interests.length} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTERESTS_LIST.map((item) => {
              const isSelected = formData.interests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`interest-${item.id.toLowerCase()}`}
                  onClick={() => handleInterestToggle(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/20'
                      : 'bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-slate-400'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Preferences: Transit, Stay, Food */}
        <div className="space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2">
            <BedDouble className="w-4 h-4 text-teal-500" />
            <span>4. Logistics Preferences</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preferred Transit */}
            <div className="space-y-1.5">
              <label htmlFor="pref-transport-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Preferred Transit
              </label>
              <select
                id="pref-transport-select"
                value={formData.preferredTransport}
                onChange={(e) => setFormData({ ...formData, preferredTransport: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                {TRANSPORTS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Accommodation Preference */}
            <div className="space-y-1.5">
              <label htmlFor="pref-stay-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Accommodation Type
              </label>
              <select
                id="pref-stay-select"
                value={formData.accommodationPref}
                onChange={(e) => setFormData({ ...formData, accommodationPref: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                {ACCOMMODATIONS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Food Preference */}
            <div className="space-y-1.5">
              <label htmlFor="pref-food-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                Food Preference
              </label>
              <select
                id="pref-food-select"
                value={formData.foodPref}
                onChange={(e) => setFormData({ ...formData, foodPref: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium outline-hidden focus:ring-2 focus:ring-teal-500"
              >
                {FOOD_PREFS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Generates day-by-day activities, estimated expenses, sample hotels, transit advice, and offline emergency kit.
          </div>

          <button
            type="submit"
            id="planner-submit-btn"
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing Your Complete Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generate Complete Trip Plan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
