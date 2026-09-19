import React from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Calendar,
  Wallet,
  Building2,
  Train,
  Utensils,
  ShieldCheck,
  GraduationCap,
  Download,
  Bot,
  MapPin,
  Star,
  Users,
  Clock,
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/destinations';

interface HomePageProps {
  onPlanTripClick: () => void;
  onExploreClick: () => void;
  onQuickDestination: (destName: string) => void;
  onOpenAssistant: () => void;
  studentMode: boolean;
  onToggleStudentMode: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onPlanTripClick,
  onExploreClick,
  onQuickDestination,
  onOpenAssistant,
  studentMode,
  onToggleStudentMode,
}) => {
  const popularCards = [
    {
      name: 'Tokyo',
      country: 'Japan',
      tag: 'Futuristic & Ancient',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      description: 'Shinjuku neon, historic Senso-ji temples, artisanal ramen, and seamless bullet trains.',
    },
    {
      name: 'Paris',
      country: 'France',
      tag: 'Art, Romance & Cuisine',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      description: 'The Eiffel Tower, world-class Louvre galleries, sidewalk cafes, and romantic Seine riverwalks.',
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      tag: 'Tropical Island Paradise',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      description: 'Lush emerald rice terraces, cliffside Uluwatu temples, surf breaks, and healthy smoothie bowls.',
    },
    {
      name: 'New York',
      country: 'United States',
      tag: 'Iconic Metropolis',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
      description: 'Central Park strolls, Broadway theaters, world-class museums, and 24/7 city energy.',
    },
    {
      name: 'Rome',
      country: 'Italy',
      tag: 'The Eternal City',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
      description: 'Colosseum ruins, Vatican treasures, authentic Carbonara, and fountain piazzas.',
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: 'Smart AI Itinerary',
      description: 'Personalized day-by-day itineraries with morning, afternoon, and evening activities, transit times, and estimated costs.',
      badge: 'Interactive & Editable',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Wallet,
      title: 'Budget Planner & Alerts',
      description: 'Clear category breakdowns across flights, stays, dining, and emergencies with real-time over-budget warnings.',
      badge: 'Visual Analytics',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: GraduationCap,
      title: 'Student Mode',
      description: 'Instantly prioritizes certified youth hostels, free attraction days, student transit passes, and money-saving hacks.',
      badge: 'Save up to 35%',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Building2,
      title: 'Curated Accommodations',
      description: 'Sample hotel and lodging recommendations tailored to your budget range with transparent demo-data labeling.',
      badge: 'Budget to Luxury',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: Train,
      title: 'Multi-Modal Transit',
      description: 'Compares buses, high-speed rail, flights, rideshares, and rapid metro systems with travel times and costs.',
      badge: 'Best Route Advice',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Utensils,
      title: 'Food & Local Culture',
      description: 'Must-try regional dishes, vegetarian/halal options, street food stalls, essential local phrases, and customs.',
      badge: 'Local Survival Guide',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: ShieldCheck,
      title: 'Safety & Emergency Hub',
      description: 'Destination-specific emergency dispatch contacts, scam warnings, health precautions, and packing guides.',
      badge: 'Peace of Mind',
      color: 'from-emerald-600 to-green-700',
    },
    {
      icon: Download,
      title: 'Offline Travel Guide',
      description: 'Save the complete trip plan, maps guide, and emergency numbers locally for seamless access without mobile data.',
      badge: 'Zero Roaming Costs',
      color: 'from-slate-700 to-slate-900',
    },
    {
      icon: Bot,
      title: 'AI Travel Assistant',
      description: 'Context-aware travel assistant ready to answer questions on packing, day plans, cheaper alternatives, and local dishes.',
      badge: 'Gemini AI Ready',
      color: 'from-teal-500 to-emerald-600',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-slate-700 shadow-2xl">
        {/* Background glow & subtle pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>Smart AI Travel System – One App for Complete Travel Experience</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Plan. Explore. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              Travel Smarter.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The all-in-one AI travel planning application that seamlessly combines trip planning, budget management, accommodation, transportation, food discovery, safety alerts, and local guidance into one intuitive platform.
          </p>

          {/* Student Mode Highlight Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="hero-student-mode-toggle"
              onClick={onToggleStudentMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                studentMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-md shadow-amber-500/10'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Student Mode: {studentMode ? 'ACTIVE (Maximizing Discounts)' : 'Enable for Student Discounts'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="home-plan-my-trip-btn"
              onClick={onPlanTripClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-5 h-5" />
              <span>Plan My Trip</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              id="home-explore-features-btn"
              onClick={onExploreClick}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm sm:text-base bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Features</span>
            </button>

            <button
              id="home-assistant-launch-btn"
              onClick={onOpenAssistant}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Bot className="w-5 h-5" />
              <span>Ask Travel AI</span>
            </button>
          </div>

          {/* Trust stats & badges */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-teal-400">100%</div>
              <div className="text-xs text-slate-400">Offline Guide Capable</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">7-in-1</div>
              <div className="text-xs text-slate-400">Travel Modules Integrated</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-amber-400">Up to 35%</div>
              <div className="text-xs text-slate-400">Student Budget Savings</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-cyan-400">Instant</div>
              <div className="text-xs text-slate-400">AI Plan Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Inspiration / Popular Destinations */}
      <section id="popular-destinations-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <MapPin className="w-4 h-4" />
              <span>Instant Inspiration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Popular Destinations Ready to Plan
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Select any global destination to instantly prefill your personalized itinerary.
            </p>
          </div>

          <button
            id="custom-plan-cta"
            onClick={onPlanTripClick}
            className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Or enter any custom destination</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {popularCards.map((card) => (
            <div
              key={card.name}
              id={`card-dest-${card.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src={card.image}
                  alt={card.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>{card.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {card.country}
                  </span>
                  <h3 className="text-lg font-bold mt-1 text-white">{card.name}</h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {card.description}
                </p>

                <button
                  id={`btn-plan-${card.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => onQuickDestination(card.name)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-teal-600 hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Plan for {card.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Platform Features Breakdown */}
      <section id="features-overview-section" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <Compass className="w-4 h-4" />
            <span>Complete Travel Experience</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need in One Modern App
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Say goodbye to jumping between 10 different booking apps, map tabs, and budget spreadsheets. Smart AI Travel System unifies your complete journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                id={`feature-card-${idx + 1}`}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} text-white flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Student Mode Promotional Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 p-8 sm:p-10 text-slate-900 dark:text-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <span>Built Especially for Students & Budget Explorers</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Traveling on a College or Gap-Year Budget?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl">
              Turn on Student Mode anytime with one click. We automatically prioritize verified youth hostels, affordable transit passes, free attraction admission days, and student ID perks.
            </p>
          </div>

          <button
            id="student-mode-cta-banner"
            onClick={onToggleStudentMode}
            className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 ${
              studentMode
                ? 'bg-amber-600 text-white hover:bg-amber-500'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold'
            }`}
          >
            {studentMode ? 'Student Mode is Active' : 'Activate Student Mode Now'}
          </button>
        </div>
      </section>
    </div>
  );
};
