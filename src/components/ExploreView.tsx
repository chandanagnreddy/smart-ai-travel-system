import React, { useState } from 'react';
import {
  Building2,
  Train,
  Utensils,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Check,
  Globe,
  Leaf,
  Info,
  Shield,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Search,
  Loader2,
  Navigation,
} from 'lucide-react';
import { TripPlan, GroundedPlace, GroundingSource } from '../types';

export type ExploreSubTab = 'hotels' | 'transport' | 'food' | 'grounding';

interface ExploreViewProps {
  trip: TripPlan;
  onAskAI: (query: string) => void;
  defaultSubTab?: ExploreSubTab;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  trip,
  onAskAI,
  defaultSubTab = 'hotels',
}) => {
  const [subTab, setSubTab] = useState<ExploreSubTab>(defaultSubTab);
  const [hotelFilter, setHotelFilter] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');

  // Live Grounding Hub State
  const [groundingMode, setGroundingMode] = useState<'maps' | 'search'>('maps');
  const [groundingQuery, setGroundingQuery] = useState<string>('');
  const [groundingLoading, setGroundingLoading] = useState<boolean>(false);
  const [groundedPlaces, setGroundedPlaces] = useState<GroundedPlace[]>([]);
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [groundingSummary, setGroundingSummary] = useState<string>('');

  const handleFetchPlaces = async (customQuery?: string) => {
    const q = (customQuery || groundingQuery).trim();
    setGroundingLoading(true);
    try {
      const res = await fetch('/api/grounding/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: trip.formData.destination,
          query: q || `Top places, restaurants and attractions in ${trip.formData.destination}`,
        }),
      });
      const data = await res.json();
      setGroundedPlaces(data.places || []);
      setGroundingSummary(data.summary || '');
    } catch (e) {
      console.error('Failed to fetch grounded places:', e);
    } finally {
      setGroundingLoading(false);
    }
  };

  const handleFetchSearch = async (customQuery?: string) => {
    const q = (customQuery || groundingQuery).trim();
    setGroundingLoading(true);
    try {
      const res = await fetch('/api/grounding/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: trip.formData.destination,
          query: q || `Up-to-date travel advice and practical tips for ${trip.formData.destination}`,
        }),
      });
      const data = await res.json();
      setGroundingSources(data.sources || []);
      setGroundingSummary(data.summary || '');
    } catch (e) {
      console.error('Failed to fetch search grounding:', e);
    } finally {
      setGroundingLoading(false);
    }
  };

  const filteredHotels = trip.accommodations.filter((h) => {
    if (hotelFilter === 'all') return true;
    if (hotelFilter === 'student') return h.isStudentFriendly;
    return h.category.toLowerCase() === hotelFilter.toLowerCase();
  });

  const filteredFood = trip.foodGuide.filter((f) => {
    if (dietaryFilter === 'all') return true;
    if (dietaryFilter === 'vegetarian') return f.dietary === 'Vegetarian' || f.dietary === 'Vegan';
    if (dietaryFilter === 'student') return f.isStudentBudgetFriendly;
    return f.dietary.toLowerCase() === dietaryFilter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Explore Destination Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore {trip.formData.destination}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Accommodations, transit networks, culinary specialties, and cultural etiquette.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              id="subtab-hotels-btn"
              onClick={() => setSubTab('hotels')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                subTab === 'hotels'
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Lodging ({trip.accommodations.length})</span>
            </button>

            <button
              id="subtab-transport-btn"
              onClick={() => setSubTab('transport')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                subTab === 'transport'
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>Transit ({trip.transportation.length})</span>
            </button>

            <button
              id="subtab-food-btn"
              onClick={() => setSubTab('food')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                subTab === 'food'
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Food & Culture</span>
            </button>

            <button
              id="subtab-grounding-btn"
              onClick={() => {
                setSubTab('grounding');
                if (groundedPlaces.length === 0 && !groundingLoading) {
                  handleFetchPlaces(`Top places, restaurants and attractions in ${trip.formData.destination}`);
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                subTab === 'grounding'
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Live Maps & Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: ACCOMMODATION */}
      {subTab === 'hotels' && (
        <div className="space-y-6">
          {/* Sample Data Disclaimer Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between text-xs text-amber-800 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong>Sample / Demo Recommendations:</strong> These sample lodgings represent typical price points, amenities, and locations for {trip.formData.destination}. Live booking APIs can be integrated later.
              </span>
            </div>
            <button
              onClick={() => onAskAI(`What are the best neighborhoods or hostels to stay in ${trip.formData.destination}?`)}
              className="hidden sm:flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 hover:underline shrink-0"
            >
              <span>Ask AI Advice</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hotel Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All Stays' },
              { id: 'student', label: '🎓 Student Picks' },
              { id: 'hostel', label: 'Hostels / Pods' },
              { id: 'hotel', label: 'Standard Hotels' },
              { id: 'boutique', label: 'Boutique' },
              { id: 'resort', label: 'Resort & Spa' },
            ].map((f) => (
              <button
                key={f.id}
                id={`filter-hotel-${f.id}`}
                onClick={() => setHotelFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  hotelFilter === f.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Accommodations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                id={`hotel-card-${hotel.id}`}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {hotel.category}
                        </span>
                        {hotel.isStudentFriendly && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            🎓 Student Friendly
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-medium text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-sm">
                          DEMO DATA
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-500" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-slate-900 dark:text-white">
                        ${hotel.pricePerNight}
                        <span className="text-xs font-normal text-slate-400">/night</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        ${hotel.totalPrice} for {trip.formData.days} nights
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{hotel.rating}</span>
                    </div>
                    <span className="text-slate-400">({hotel.reviewCount} guest reviews)</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-slate-600 dark:text-slate-400">{hotel.distanceFromAttractions}</span>
                  </div>

                  {/* Amenities / Facilities */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    {hotel.basicFacilities.map((fac, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                      >
                        ✓ {fac}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Price Tier: {hotel.priceRange}</span>
                  <button
                    onClick={() => onAskAI(`Tell me more about staying at ${hotel.name} in ${trip.formData.destination}.`)}
                    className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                  >
                    <span>Ask Assistant</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TRANSPORTATION */}
      {subTab === 'transport' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              <strong>Budget-Optimized Transit Options:</strong> We evaluated transit speeds, carbon emissions, and cost per traveler for {trip.formData.destination}.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trip.transportation.map((opt) => (
              <div
                key={opt.id}
                id={`trans-card-${opt.id}`}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 flex items-center justify-center font-bold">
                        {opt.mode === 'Flight' ? '✈️' : opt.mode === 'Train' ? '🚆' : opt.mode === 'Bus' ? '🚌' : opt.mode === 'Cab' ? '🚖' : '🚇'}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {opt.mode}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {opt.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between py-2 border-y border-slate-100 dark:border-slate-700/60">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">
                        ${opt.estimatedCost}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">estimated</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{opt.approximateTime}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {opt.recommendation}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-400">
                    <strong className="text-teal-600 dark:text-teal-400">Local Transit Tip: </strong>
                    {opt.localTransitTip}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Carbon: <strong>{opt.carbonRating}</strong>
                  </span>
                  {opt.isStudentRecommended && (
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      🎓 Student Pick
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FOOD & LOCAL CULTURE GUIDE */}
      {subTab === 'food' && (
        <div className="space-y-10">
          {/* Section: Local Dishes & Food Area */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Must-Try Dishes in {trip.formData.destination}
                </h3>
                <p className="text-xs text-slate-500">
                  Curated street foods, regional recipes, and budget-friendly market specialties.
                </p>
              </div>

              {/* Dietary filter */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: 'All Dishes' },
                  { id: 'vegetarian', label: '🌱 Vegetarian/Vegan' },
                  { id: 'student', label: '🎓 Budget Eats' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDietaryFilter(d.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      dietaryFilter === d.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFood.map((food) => (
                <div
                  key={food.id}
                  id={`food-card-${food.id}`}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {food.type}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            food.dietary === 'Vegetarian'
                              ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {food.dietary}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          {food.name}
                        </h4>
                        {food.localName && (
                          <div className="text-xs text-slate-400 font-medium">{food.localName}</div>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                          ~${food.approximateCost}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {food.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500">
                    <span>Where to find: </span>
                    <strong className="text-slate-700 dark:text-slate-300">{food.whereToTry}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Local Cultural Survival Guide */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>Local Language & Cultural Guide</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Survival Phrases & Cultural Tips for {trip.formData.destination}
              </h3>
            </div>

            {/* Essential Phrases */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Essential {trip.localGuide.localLanguage} Phrases
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {trip.localGuide.keyPhrases.map((phrase, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1"
                  >
                    <div className="text-sm font-black text-teal-600 dark:text-teal-400">
                      {phrase.phrase}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {phrase.translation}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      Pronounced: "{phrase.pronunciation}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currency & Cultural Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              {/* Cultural Etiquette */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Cultural Norms & Etiquette
                </h4>
                <div className="space-y-2">
                  {trip.localGuide.culturalTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="text-teal-500 font-bold">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currency & Transit Practicalities */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Currency & Local Transit Tips
                </h4>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Currency: {trip.localGuide.currency}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {trip.localGuide.currencyTip}
                  </p>
                </div>

                <div className="space-y-2">
                  {trip.localGuide.localTransitTips.map((tt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="text-indigo-500 font-bold">🚇</span>
                      <span>{tt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: LIVE GOOGLE MAPS & SEARCH GROUNDING */}
      {subTab === 'grounding' && (
        <div className="space-y-6">
          {/* Grounding Header Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 text-white shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Google Maps Grounding</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Google Search Grounding</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                    gemini-3.5-flash
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Live Grounded Travel Intelligence for {trip.formData.destination}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Query verified place coordinates, reviews, and directions via Google Maps, or fetch real-time web advice via Google Search.
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/80 border border-slate-700 self-start md:self-center">
                <button
                  type="button"
                  id="grounding-tab-maps-toggle"
                  onClick={() => {
                    setGroundingMode('maps');
                    if (groundedPlaces.length === 0) {
                      handleFetchPlaces();
                    }
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    groundingMode === 'maps'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps Places</span>
                </button>
                <button
                  type="button"
                  id="grounding-tab-search-toggle"
                  onClick={() => {
                    setGroundingMode('search');
                    if (groundingSources.length === 0) {
                      handleFetchSearch();
                    }
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    groundingMode === 'search'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Google Search Data</span>
                </button>
              </div>
            </div>

            {/* Grounding Search Bar & Instant Filter Chips */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (groundingMode === 'maps') {
                  handleFetchPlaces();
                } else {
                  handleFetchSearch();
                }
              }}
              className="flex items-center gap-2 pt-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={
                    groundingMode === 'maps'
                      ? `Search places, restaurants, or sights in ${trip.formData.destination} (Google Maps)...`
                      : `Ask about current events, travel rules, or transit in ${trip.formData.destination} (Google Search)...`
                  }
                  value={groundingQuery}
                  onChange={(e) => setGroundingQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={groundingLoading}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50 ${
                  groundingMode === 'maps'
                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                    : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/20'
                }`}
              >
                {groundingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Querying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Explore</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Query Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold">Quick Queries:</span>
              {groundingMode === 'maps' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Authentic local restaurants and street food in ${trip.formData.destination}`);
                      handleFetchPlaces(`Authentic local restaurants and street food in ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    🍜 Authentic Eats
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Must-see historic shrines, temples and landmarks in ${trip.formData.destination}`);
                      handleFetchPlaces(`Must-see historic shrines, temples and landmarks in ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    🏛️ Historic Sights
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Best panoramic viewpoints and sunset spots in ${trip.formData.destination}`);
                      handleFetchPlaces(`Best panoramic viewpoints and sunset spots in ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    🌅 Sunset Viewpoints
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Specialty coffee roasters and cozy cafes in ${trip.formData.destination}`);
                      handleFetchPlaces(`Specialty coffee roasters and cozy cafes in ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    ☕ Coffee & Cafes
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Current transit passes, subway discount tickets in ${trip.formData.destination}`);
                      handleFetchSearch(`Current transit passes, subway discount tickets in ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    🚇 Transit Passes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Latest seasonal weather and packing advisory for ${trip.formData.destination}`);
                      handleFetchSearch(`Latest seasonal weather and packing advisory for ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    ⛅ Seasonal Weather
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Local etiquette, cultural customs, and tipping rules in ${trip.formData.destination}`);
                      handleFetchSearch(`Local etiquette, cultural customs, and tipping rules in ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    🤝 Etiquette & Tipping
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroundingQuery(`Top student travel discounts and money saving hacks in ${trip.formData.destination}`);
                      handleFetchSearch(`Top student travel discounts and money saving hacks in ${trip.formData.destination}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700"
                  >
                    🎓 Student Hacks
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Results Summary Box if present */}
          {groundingSummary && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs leading-relaxed text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                <span>AI Grounding Intelligence Summary:</span>
              </div>
              <p>{groundingSummary}</p>
            </div>
          )}

          {/* GOOGLE MAPS GROUNDING RESULTS */}
          {groundingMode === 'maps' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>Verified Places from Google Maps Grounding ({groundedPlaces.length})</span>
                </h4>
                <span className="text-xs text-slate-400">Model: gemini-3.5-flash with googleMaps tool</span>
              </div>

              {groundedPlaces.length === 0 && !groundingLoading && (
                <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
                  Click one of the quick query buttons above or search for a place to see live Google Maps grounding results.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groundedPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          📍 {place.title}
                        </h5>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0">
                          Maps Grounded
                        </span>
                      </div>

                      {place.address && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
                          <Navigation className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                          <span>{place.address}</span>
                        </div>
                      )}

                      {place.reviewSnippet && (
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 italic">
                          {place.reviewSnippet}
                        </div>
                      )}
                    </div>

                    <a
                      href={place.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GOOGLE SEARCH GROUNDING RESULTS */}
          {groundingMode === 'search' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-500" />
                  <span>Up-to-Date Web Sources from Google Search Grounding ({groundingSources.length})</span>
                </h4>
                <span className="text-xs text-slate-400">Model: gemini-3.5-flash with googleSearch tool</span>
              </div>

              {groundingSources.length === 0 && !groundingLoading && (
                <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
                  Click one of the quick queries above or type a question to retrieve live Google Search grounded sources.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groundingSources.map((source, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                          Search Grounded
                        </span>
                        <Globe className="w-3.5 h-3.5 text-cyan-500" />
                      </div>
                      <h5 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2">
                        {source.title}
                      </h5>
                    </div>

                    <a
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Read Verified Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
