import {
  TripFormData,
  TripPlan,
  DayItinerary,
  BudgetBreakdown,
  AccommodationItem,
  TransportOption,
  FoodGuideItem,
  LocalCulturalGuide,
  SafetyAlertItem,
  EmergencyContacts,
} from '../types';

interface DestinationSeed {
  name: string;
  country: string;
  tagline: string;
  currency: string;
  currencyCode: string;
  language: string;
  phrases: { phrase: string; translation: string; pronunciation: string }[];
  landmarks: string[];
  foods: { name: string; localName?: string; desc: string; cost: number; veg: boolean }[];
  culturalTips: string[];
  transitTips: string[];
  emergency: EmergencyContacts;
  sampleHotels: {
    name: string;
    category: 'Hostel' | 'Hotel' | 'Boutique' | 'Resort';
    pricePerNight: number;
    rating: number;
    reviews: number;
    distance: string;
    facilities: string[];
    isStudent: boolean;
  }[];
  scams: string[];
  weatherNote: string;
}

export const POPULAR_DESTINATIONS: Record<string, DestinationSeed> = {
  tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    tagline: 'Futuristic Metropolises meet Ancient Tradition',
    currency: 'Japanese Yen (¥ / JPY)',
    currencyCode: 'JPY',
    language: 'Japanese',
    phrases: [
      { phrase: 'Konnichiwa', translation: 'Hello', pronunciation: 'kohn-nee-chee-wah' },
      { phrase: 'Arigatou gozaimasu', translation: 'Thank you very much', pronunciation: 'ah-ree-gah-toh go-zy-mahs' },
      { phrase: 'Sumimasen', translation: 'Excuse me / Sorry', pronunciation: 'soo-mee-mah-sen' },
      { phrase: 'Kore wa ikura desu ka?', translation: 'How much is this?', pronunciation: 'ko-ray wah ee-koo-rah des-kah' },
      { phrase: 'Eigo ga hanasemasu ka?', translation: 'Do you speak English?', pronunciation: 'ay-go gah hah-nah-say-mas-kah' },
    ],
    landmarks: [
      'Senso-ji Temple & Asakusa',
      'Shibuya Crossing & Hachiko',
      'Shinjuku Gyoen National Garden',
      'Akihabara Electric Town',
      'Meiji Jingu Shrine & Harajuku',
      'Tokyo Skytree & Sumida River',
      'Tsukiji Outer Market',
      'Odaiba Seaside Park & TeamLab Planets',
    ],
    foods: [
      { name: 'Tonkotsu Ramen', localName: '豚骨ラーメン', desc: 'Rich slow-simmered pork bone broth with springy noodles and chashu.', cost: 9, veg: false },
      { name: 'Fresh Nigiri Sushi', localName: '握り寿司', desc: 'Market-fresh tuna, salmon, and seasonal catch atop seasoned rice.', cost: 18, veg: false },
      { name: 'Vegetable Tempura Donburi', localName: '天丼', desc: 'Crispy, airy battered seasonal vegetables over steamed jasmine rice.', cost: 10, veg: true },
      { name: 'Matcha Parfait & Mochi', localName: '抹茶パフェ', desc: 'Uji stone-ground green tea soft serve with chewy sweet rice cakes.', cost: 6, veg: true },
      { name: 'Takoyaki & Yakitori', localName: 'たこ焼き', desc: 'Savory street-cart skewered bites and dashi-filled batter balls.', cost: 5, veg: false },
    ],
    culturalTips: [
      'No tipping culture: Outstanding service is built-in; leaving extra cash can cause confusion.',
      'Quiet transit: Keep phone calls on silent mode when riding the Yamanote subway lines.',
      'Trash etiquette: Public bins are scarce; carry a small bag to take your litter back to your lodging.',
      'Footwear courtesy: Always slip off your shoes when entering traditional tatami rooms or ryokans.',
    ],
    transitTips: [
      'Get a digital Suica or Pasmo card on Apple/Google Wallet for tap-and-go access to all trains and convenience stores.',
      'Tokyo Subway 24/48/72-hour tourist passes save up to 45% compared to single tickets.',
      'Trains stop running around midnight; plan evening adventures accordingly to avoid late-night taxi fares.',
    ],
    emergency: {
      police: '110',
      ambulance: '119',
      touristPolice: '+81-3-3501-0110 (English Tokyo Helpline)',
      emergencyGeneral: '110 / 119',
      embassyHotline: '+81-3-3224-5000 (US Embassy Tokyo)',
    },
    sampleHotels: [
      {
        name: 'Unplan Shinjuku Capsule & Lounge',
        category: 'Hostel',
        pricePerNight: 36,
        rating: 4.8,
        reviews: 1420,
        distance: '0.4 km from Shinjuku-sanchome Station',
        facilities: ['High-Speed Wi-Fi', 'Pod Privacy Curtains', 'Shared Kitchen', 'Luggage Storage', 'English Desk'],
        isStudent: true,
      },
      {
        name: 'Hotel Gracery Shinjuku (Godzilla Head)',
        category: 'Hotel',
        pricePerNight: 125,
        rating: 4.5,
        reviews: 3200,
        distance: '0.3 km from JR Shinjuku Station',
        facilities: ['Panoramic City View', 'Buffet Breakfast', 'En-suite Bath', 'AC', '24/7 Concierge'],
        isStudent: false,
      },
      {
        name: 'Kaisu Akasaka Ryokan Boutique',
        category: 'Boutique',
        pricePerNight: 85,
        rating: 4.7,
        reviews: 980,
        distance: '0.2 km from Akasaka Metro',
        facilities: ['Tatami Lounge', 'Craft Cafe', 'Free Wi-Fi', 'Bicycle Rentals'],
        isStudent: true,
      },
      {
        name: 'Cerulean Tower Tokyu Hotel Shibuya',
        category: 'Resort',
        pricePerNight: 280,
        rating: 4.9,
        reviews: 2150,
        distance: '0.5 km from Shibuya Crossing',
        facilities: ['Sky Lounge', 'Indoor Pool', 'Spa & Wellness', 'Fine Dining', 'Airport Limousine Bus'],
        isStudent: false,
      },
    ],
    scams: [
      'Nightlife touts in Kabukicho or Roppongi offering "free drinks" or cheap bars—never follow street solicitors into back alley venues.',
      'Fake monk donation scams near major temples handing out brass amulets and demanding hefty cash donations.',
    ],
    weatherNote: 'Moderate temperate climate. Spring (cherry blossoms) and Autumn (foliage) are mild and pleasant. Summers are humid with occasional rain.',
  },

  paris: {
    name: 'Paris',
    country: 'France',
    tagline: 'The City of Light, Art, and Timeless Romance',
    currency: 'Euro (€ / EUR)',
    currencyCode: 'EUR',
    language: 'French',
    phrases: [
      { phrase: 'Bonjour', translation: 'Hello / Good morning', pronunciation: 'bohn-zhoor' },
      { phrase: 'Merci beaucoup', translation: 'Thank you very much', pronunciation: 'mair-see boh-koo' },
      { phrase: "S'il vous plaît", translation: 'Please', pronunciation: 'seel voo pleh' },
      { phrase: 'Combien ça coûte?', translation: 'How much does it cost?', pronunciation: 'kohm-byan sah koot' },
      { phrase: 'Parlez-vous anglais?', translation: 'Do you speak English?', pronunciation: 'par-lay voo ahn-glay' },
    ],
    landmarks: [
      'Eiffel Tower & Champ de Mars',
      'Louvre Museum & Tuileries Garden',
      'Montmartre & Sacré-Cœur Basilica',
      'Notre-Dame Cathedral & Île de la Cité',
      'Musée d’Orsay & Seine Riverbank Walk',
      'Arc de Triomphe & Champs-Élysées',
      'Latin Quarter & Panthéon',
      'Palace of Versailles (Day excursion)',
    ],
    foods: [
      { name: 'Fresh Croissant & Café au Lait', desc: 'Flaky artisanal butter pastry baked fresh at local boulangeries.', cost: 4, veg: true },
      { name: 'Traditional French Crêpes & Galettes', desc: 'Savory buckwheat galette with emmental cheese, egg, or sweet caramel.', cost: 8, veg: true },
      { name: 'Boeuf Bourguignon', desc: 'Slow-braised tender beef in red Burgundy wine, mushrooms, and carrots.', cost: 19, veg: false },
      { name: 'Ratatouille Provençale', desc: 'Simmered Mediterranean zucchini, eggplant, bell peppers, and fresh herbs.', cost: 13, veg: true },
      { name: 'Macarons from Saint-Germain', desc: 'Crisp almond meringue shells filled with raspberry, pistachio, or dark ganache.', cost: 6, veg: true },
    ],
    culturalTips: [
      'Always greet shopkeepers with a polite "Bonjour" when entering any store—it is basic French etiquette.',
      'Take your time over dining: Parisian meals are meant to be savored slowly without rushing the bill.',
      'Dining outdoors: Sidewalk terrace seating often carries a tiny surcharge compared to the interior counter.',
    ],
    transitTips: [
      'Use the Paris Metro with a contactless Navigo Easy card or 10-trip "carnet" ticket pack to save 30%.',
      'Under 26 EU residents get free entry to the Louvre, Musée d’Orsay, and Arc de Triomphe; international students get deep discounts.',
      'Walking is often faster and much more scenic than transferring between dense central metro stations.',
    ],
    emergency: {
      police: '17',
      ambulance: '15 (SAMU)',
      touristPolice: '+33-1-53-71-53-71 (Paris Tourist Police)',
      emergencyGeneral: '112 (EU Universal Emergency)',
      embassyHotline: '+33-1-43-12-22-22 (US Embassy Paris)',
    },
    sampleHotels: [
      {
        name: 'The People Hostel – Paris Belleville',
        category: 'Hostel',
        pricePerNight: 42,
        rating: 4.6,
        reviews: 2100,
        distance: '0.2 km from Couronnes Metro',
        facilities: ['Rooftop Bar with Eiffel View', 'Free Wi-Fi', 'Ensuite Pods', 'Student Lounge', 'Security Lockers'],
        isStudent: true,
      },
      {
        name: 'Hôtel Fabric Oberkampf',
        category: 'Boutique',
        pricePerNight: 140,
        rating: 4.8,
        reviews: 1350,
        distance: '0.4 km from Saint-Ambroise',
        facilities: ['Converted Textile Mill', 'Free Breakfast', 'Honesty Bar', 'Fitness & Spa'],
        isStudent: false,
      },
      {
        name: 'Hôtel Le Relais Saint-Germain',
        category: 'Hotel',
        pricePerNight: 195,
        rating: 4.7,
        reviews: 890,
        distance: '0.1 km from Odéon Metro',
        facilities: ['Historic Latin Quarter', 'Gourmet Bistro', 'En-suite Luxury', 'Concierge'],
        isStudent: false,
      },
    ],
    scams: [
      'The "Friendship Bracelet" scam near Sacré-Cœur steps: vendors attempt to tie braided string onto your wrist and demand cash.',
      'The "Petition / Gold Ring" scam around the Louvre: individuals pretend to find a ring or ask for petition signatures while pickpocketing.',
    ],
    weatherNote: 'Mild European climate. Pack a light waterproof jacket. Spring and Autumn provide comfortable temperatures for strolling.',
  },

  bali: {
    name: 'Bali',
    country: 'Indonesia',
    tagline: 'Island of the Gods, Emerald Terraces, and Sacred Waves',
    currency: 'Indonesian Rupiah (Rp / IDR)',
    currencyCode: 'IDR',
    language: 'Indonesian & Balinese',
    phrases: [
      { phrase: 'Halo / Selamat Pagi', translation: 'Hello / Good morning', pronunciation: 'suh-lah-maht pah-ghee' },
      { phrase: 'Terima Kasih', translation: 'Thank you', pronunciation: 'teh-ree-mah kah-see' },
      { phrase: 'Sama-sama', translation: "You're welcome", pronunciation: 'sah-mah sah-mah' },
      { phrase: 'Berapa harganya?', translation: 'How much is this?', pronunciation: 'beh-rah-pah har-gah-nyah' },
      { phrase: 'Tolong', translation: 'Help / Please', pronunciation: 'toh-long' },
    ],
    landmarks: [
      'Tegallalang Rice Terraces & Ubud Monkey Forest',
      'Uluwatu Cliffside Temple & Kecak Dance',
      'Tanah Lot Sunset Sea Temple',
      'Mount Batur Sunrise Trek',
      'Canggu & Seminyak Coastal Breaks',
      'Tirta Empul Sacred Water Spring',
      'Nusa Penida Kelingking Beach day trip',
      'Campuhan Ridge Scenic Walk',
    ],
    foods: [
      { name: 'Nasi Goreng Special', desc: 'Indonesian fragrant wok-fried rice with sunny-side egg, chicken satay, and shrimp crackers.', cost: 3.5, veg: false },
      { name: 'Gado-Gado with Peanut Sauce', desc: 'Steamed garden greens, crispy tempeh, tofu, boiled egg, and rich handmade peanut dressing.', cost: 2.8, veg: true },
      { name: 'Balinese Ayam Betutu', desc: 'Slow-roasted chicken marinated in rich aromatic bumbu spice blend inside banana leaves.', cost: 6, veg: false },
      { name: 'Tropical Dragonfruit Smoothie Bowl', desc: 'Blended pink dragonfruit, mango, granola, chia seeds, and fresh shredded coconut.', cost: 4, veg: true },
      { name: 'Fresh Young Coconut', desc: 'Chilled whole coconut cracked fresh at beachside warungs.', cost: 1.5, veg: true },
    ],
    culturalTips: [
      'Temple Dress Code: Always wear a sarong and sash when entering holy temple compounds (rentals available at entrance).',
      'Canang Sari offerings: Watch your step on sidewalks; daily woven palm-leaf flower offerings are placed on the ground.',
      'Head sacredness: Never touch anyone on the head (even children) as it is considered the most sacred part of the body.',
    ],
    transitTips: [
      'Download Grab or Gojek apps for transparent, affordable motorbike rides and food deliveries.',
      'Scooter rental is common ($4–$7/day), but only ride if you possess an International Driving Permit and wear a helmet.',
      'Hiring a private driver for a full 10-hour island tour is very affordable ($35–$45 total for a private car).',
    ],
    emergency: {
      police: '110',
      ambulance: '118',
      touristPolice: '+62-361-754599 (Bali Tourist Assistance)',
      emergencyGeneral: '112',
      embassyHotline: '+62-361-233605 (US Consular Agency Bali)',
    },
    sampleHotels: [
      {
        name: 'Puri Garden Hotel & Hostel Ubud',
        category: 'Hostel',
        pricePerNight: 22,
        rating: 4.9,
        reviews: 2890,
        distance: '0.6 km from Monkey Forest Ubud',
        facilities: ['Free Daily Yoga', 'Swimming Pool', 'Puppy Therapy Sessions', 'Free Breakfast', 'Air-Conditioned Dorms'],
        isStudent: true,
      },
      {
        name: 'The Kayon Jungle Resort & Spa',
        category: 'Resort',
        pricePerNight: 210,
        rating: 4.9,
        reviews: 1780,
        distance: '15 min north of Ubud Center',
        facilities: ['Three-tier Infinity Pools', 'Valley Views', 'Spa Pavilion', 'Gourmet Organic Dining'],
        isStudent: false,
      },
      {
        name: 'Canggu Surf Villa & Eco Lofts',
        category: 'Boutique',
        pricePerNight: 55,
        rating: 4.7,
        reviews: 940,
        distance: '0.4 km from Echo Beach',
        facilities: ['Surf Board Storage', 'Fast Wi-Fi for Digital Nomads', 'Poolside Cafe'],
        isStudent: true,
      },
    ],
    scams: [
      'Money changers displaying unrealistic inflated rates—always use authorized bank money changers or official ATMs.',
      'Aggressive taxi drivers refusing meters at airport arrival; always order inside the Grab lounge or use prepaid airport desk.',
    ],
    weatherNote: 'Tropical warm paradise year-round (27°C–31°C). Dry season (April–October) is prime; wet season (Nov–March) brings brief refreshing showers.',
  },

  'new york': {
    name: 'New York City',
    country: 'United States',
    tagline: 'The Concrete Jungle Where Dreams Are Made',
    currency: 'US Dollar ($ / USD)',
    currencyCode: 'USD',
    language: 'English',
    phrases: [
      { phrase: 'Hey, how are you doing?', translation: 'Standard greeting', pronunciation: 'hay how ya doin' },
      { phrase: 'Can I get a regular coffee?', translation: 'Drip coffee with milk & sugar', pronunciation: 'can I get...' },
      { phrase: 'Stand clear of the closing doors', translation: 'Iconic subway warning', pronunciation: 'subway announcement' },
      { phrase: 'Check please', translation: 'Request the bill at restaurant', pronunciation: 'check please' },
    ],
    landmarks: [
      'Central Park & The Ramble',
      'Times Square & Broadway Theatre District',
      'The High Line & Chelsea Market',
      'Statue of Liberty & Ellis Island Ferry',
      'Metropolitan Museum of Art (The Met)',
      'Brooklyn Bridge & DUMBO Waterfront',
      'Empire State Building or Top of the Rock',
      'One World Trade Center & 9/11 Memorial',
    ],
    foods: [
      { name: 'NYC Dollar-Slice Pizza', desc: 'Thin-crust hot cheesy slice folded lengthwise on paper plate.', cost: 3, veg: true },
      { name: 'New York Bagel with Lox & Schmear', desc: 'Boiled-then-baked chewy bagel with cream cheese, cured salmon, and capers.', cost: 9, veg: false },
      { name: 'Pastrami on Rye Sandwich', desc: 'Smoked, spiced tender beef pastrami piled high with deli mustard.', cost: 18, veg: false },
      { name: 'Halal Cart Chicken over Rice', desc: 'Flavor-packed seasoned chicken, yellow turmeric rice, white sauce, and pita.', cost: 9, veg: false },
      { name: 'Artisanal Falafel Platter', desc: 'Crisp chickpea fritters, creamy tahini, pickled cabbage, and warm pita bread.', cost: 8, veg: true },
    ],
    culturalTips: [
      'Sidewalk flow: Treat sidewalks like highways—walk on the right, keep moving, and step aside if looking at map apps.',
      'Tipping standard: 18%–20% tip is standard in seated table restaurants and for taxi rides.',
      'Subway etiquette: Let exiting passengers clear the train door completely before boarding.',
    ],
    transitTips: [
      'Use OMNY: Tap any contactless credit/debit card directly on subway turnstiles (7-day fare cap applies automatically after 12 rides).',
      'Subways run 24 hours a day, 7 days a week.',
      'The Staten Island Ferry is 100% free and provides stellar views of the Statue of Liberty and Manhattan skyline without tour boat fees.',
    ],
    emergency: {
      police: '911',
      ambulance: '911',
      touristPolice: '311 (Non-Emergency NYC Info & Assistance)',
      emergencyGeneral: '911',
      embassyHotline: '311 / 911',
    },
    sampleHotels: [
      {
        name: 'HI NYC Hostel Manhattan (Upper West Side)',
        category: 'Hostel',
        pricePerNight: 55,
        rating: 4.5,
        reviews: 4300,
        distance: '0.2 km from 103rd St Subway',
        facilities: ['Largest Private Outdoor Courtyard', 'Free Walking Tours', 'Student Rates', 'Self-Catering Kitchen'],
        isStudent: true,
      },
      {
        name: 'Arlo Midtown Boutique Hotel',
        category: 'Boutique',
        pricePerNight: 180,
        rating: 4.6,
        reviews: 1980,
        distance: '0.4 km from Times Square',
        facilities: ['Rooftop Terrace', 'Co-working Lounge', 'Smart Room Tech', 'Bicycles Included'],
        isStudent: false,
      },
      {
        name: 'CitizenM Bowery Lower East Side',
        category: 'Hotel',
        pricePerNight: 165,
        rating: 4.7,
        reviews: 2400,
        distance: '0.1 km from Grand St Station',
        facilities: ['Mood-lit Pods', 'Cloud Bedding', 'Rooftop Bar with Skyline Views'],
        isStudent: false,
      },
    ],
    scams: [
      'Costumed characters in Times Square forcing photos and then demanding $20 tips aggressively.',
      'CD / Mixtape hustlers pressing a "free music demo" into your hand and then demanding payment.',
    ],
    weatherNote: 'Four distinct seasons. Summers can be warm (28°C–33°C); winters are chilly with occasional snowfall. Layer clothing.',
  },

  rome: {
    name: 'Rome',
    country: 'Italy',
    tagline: 'The Eternal City of Empires, Fountains, and Dolce Vita',
    currency: 'Euro (€ / EUR)',
    currencyCode: 'EUR',
    language: 'Italian',
    phrases: [
      { phrase: 'Ciao / Buongiorno', translation: 'Hi / Good morning', pronunciation: 'chow / bwon-zhor-no' },
      { phrase: 'Grazie mille', translation: 'Thank you very much', pronunciation: 'graht-see-ay mee-lay' },
      { phrase: 'Per favore', translation: 'Please', pronunciation: 'pair fah-voh-ray' },
      { phrase: 'Quanto costa?', translation: 'How much does it cost?', pronunciation: 'kwahn-toh koh-stah' },
      { phrase: 'Dov’è il bagno?', translation: 'Where is the restroom?', pronunciation: 'doh-veh eel bahn-yo' },
    ],
    landmarks: [
      'Colosseum & Roman Forum',
      'Trevi Fountain & Spanish Steps',
      'Pantheon & Piazza Navona',
      'Vatican Museums & St. Peter’s Basilica',
      'Trastevere Historic Cobblestone District',
      'Castel Sant’Angelo & Tiber River',
      'Borghese Gallery & Gardens',
      'Capitoline Hill & Campidoglio',
    ],
    foods: [
      { name: 'Authentic Roman Carbonara', desc: 'Silky pasta tossed with guanciale (cured pork jowl), pecorino romano, and farm egg yolks.', cost: 12, veg: false },
      { name: 'Cacio e Pepe', desc: 'Pure Roman simplicity: al dente tonnarelli pasta, aged pecorino, and toasted black pepper.', cost: 10, veg: true },
      { name: 'Pizza al Taglio (By the slice)', desc: 'Crispy Roman sheet pizza cut with scissors and weighed, topped with mozzarella & pomodoro.', cost: 5, veg: true },
      { name: 'Supplì al Telefono', desc: 'Fried risotto ball stuffed with stringy melted mozzarella and herbs.', cost: 2.5, veg: true },
      { name: 'Artisanal Gelato', desc: 'Creamy pistacchio, dark chocolate, and stracciatella scooped in handmade cones.', cost: 3.5, veg: true },
    ],
    culturalTips: [
      'Espresso rules: Italians drink cappuccino exclusively before 11:00 AM; order an "espresso" or "caffè" in the afternoon.',
      'Public drinking fountains (Nasoni): Rome has over 2,500 historic fountains dispensing pristine, icy mountain drinking water for free!',
      'Vatican dress code: Shoulders and knees must be respectfully covered for entry into St. Peter’s Basilica.',
    ],
    transitTips: [
      'Rome is extraordinarily walkable; cobblestone alleys connect virtually all major sights within 25 minutes.',
      'Roma 24h, 48h, or 72h integrated public transit tickets cover metro, bus, and tram networks.',
      'Purchase Colosseum and Vatican tickets well in advance online to bypass legendary multi-hour queues.',
    ],
    emergency: {
      police: '113',
      ambulance: '118',
      touristPolice: '+39-06-4686 (Rome Police International Desk)',
      emergencyGeneral: '112 (European Emergency Line)',
      embassyHotline: '+39-06-46741 (US Embassy Rome)',
    },
    sampleHotels: [
      {
        name: 'The RomeHello Hostel & Social Space',
        category: 'Hostel',
        pricePerNight: 38,
        rating: 4.8,
        reviews: 3100,
        distance: '0.3 km from Repubblica Metro',
        facilities: ['Street Art Murals', 'Onsite Pub & Events', 'Ensuite Pod Beds', 'Free High-speed Wi-Fi', 'Student Discounts'],
        isStudent: true,
      },
      {
        name: 'Hotel Artemide Via Nazionale',
        category: 'Hotel',
        pricePerNight: 160,
        rating: 4.9,
        reviews: 2450,
        distance: '0.5 km from Termini Station',
        facilities: ['Rooftop Restaurant & Bar', 'Artemis Spa', 'Complimentary Minibar', 'Panoramic Views'],
        isStudent: false,
      },
      {
        name: 'Trastevere Charme Suites',
        category: 'Boutique',
        pricePerNight: 98,
        rating: 4.7,
        reviews: 820,
        distance: 'Heart of Trastevere dining quarter',
        facilities: ['Exposed Brick Ceilings', 'Espresso Machine', 'Quiet Courtyard'],
        isStudent: true,
      },
    ],
    scams: [
      'Gladiator impersonators near the Colosseum demanding €20+ after encouraging you to pose with them.',
      'Overcharging at tourist trap restaurants with hidden "pane e coperto" (bread & cover charges) exceeding €10 per person.',
    ],
    weatherNote: 'Mediterranean sunshine. Mild winters and warm, sunny summers. Spring and early autumn are ideal for outdoor walking.',
  },
};

export function getDestinationSeed(destName: string): DestinationSeed {
  const clean = destName.trim().toLowerCase();
  for (const key of Object.keys(POPULAR_DESTINATIONS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return POPULAR_DESTINATIONS[key];
    }
  }

  // Fallback intelligent synthesizer for any user-entered destination
  const formattedName = destName.charAt(0).toUpperCase() + destName.slice(1);
  return {
    name: formattedName,
    country: 'International Destination',
    tagline: `Discover the Vibrant Sights, Culture, and Wonders of ${formattedName}`,
    currency: 'Local Currency (USD / EUR equivalent)',
    currencyCode: 'USD',
    language: 'Local Language / English',
    phrases: [
      { phrase: 'Hello / Greetings', translation: 'Friendly greeting', pronunciation: 'Standard pronunciation' },
      { phrase: 'Thank you', translation: 'Expressing gratitude', pronunciation: 'Polite expression' },
      { phrase: 'Please', translation: 'Polite request', pronunciation: 'Courteous phrasing' },
      { phrase: 'How much does this cost?', translation: 'Asking price', pronunciation: 'Standard shopping query' },
      { phrase: 'Where is the station?', translation: 'Directions', pronunciation: 'Transit query' },
    ],
    landmarks: [
      `${formattedName} Historic Old Town & Central Square`,
      `${formattedName} National Heritage Museum & Art Gallery`,
      `${formattedName} Scenic City Viewpoint & Waterfront Promenade`,
      `${formattedName} Botanical Gardens & Public Parklands`,
      `${formattedName} Central Market & Artisan District`,
      `${formattedName} Historic Cathedral or Architectural Monument`,
      `${formattedName} Cultural Performing Arts Center`,
      `${formattedName} Sunset Observation Deck & Skyline View`,
    ],
    foods: [
      { name: `Traditional ${formattedName} Specialty Platter`, desc: 'Iconic local recipes crafted with seasonal produce and regional spices.', cost: 12, veg: false },
      { name: 'Artisan Flatbread & Local Dips', desc: 'Warm oven-baked flatbread served with fresh herb and garlic dressings.', cost: 6, veg: true },
      { name: `Crisp Street Food Fritters`, desc: 'Golden, savory street-market fritters served with tangy dipping glaze.', cost: 4, veg: true },
      { name: 'Slow-Braised Regional Stew', desc: 'Hearty tender cuts cooked with root vegetables in aromatic broth.', cost: 14, veg: false },
      { name: 'Heritage Sweet Pastry & Regional Tea', desc: 'Flaky baked dessert dusted with powdered sugar and spices.', cost: 4.5, veg: true },
    ],
    culturalTips: [
      `Learn basic greeting phrases in ${formattedName}—locals appreciate visitors who make the effort.`,
      'Observe local dress conventions when visiting sacred, heritage, or spiritual sites.',
      'Check whether tipping is customary or whether service charges are included on bills.',
      'Keep your receipts and confirm cash vs. contactless payment acceptance before ordering.',
    ],
    transitTips: [
      'Public transit (metro, trams, buses) is almost always the fastest and most budget-friendly way to get around.',
      'Look for 24-hour or multi-day tourist transit passes for significant savings.',
      'Download offline transit map apps to navigate without relying on mobile data.',
    ],
    emergency: {
      police: '112 / 911',
      ambulance: '112 / 911',
      touristPolice: '112 (Universal Emergency)',
      emergencyGeneral: '112 / 911',
      embassyHotline: 'Check local embassy directory',
    },
    sampleHotels: [
      {
        name: `${formattedName} Central Backpacker & Youth Hostel`,
        category: 'Hostel',
        pricePerNight: 28,
        rating: 4.7,
        reviews: 1120,
        distance: '0.4 km from Central Station',
        facilities: ['Free High-Speed Wi-Fi', 'Social Lounge', 'Communal Kitchen', 'Security Lockers', 'Student Desk'],
        isStudent: true,
      },
      {
        name: `${formattedName} City Center Modern Hotel`,
        category: 'Hotel',
        pricePerNight: 95,
        rating: 4.6,
        reviews: 2150,
        distance: '0.2 km from Historic Plaza',
        facilities: ['Breakfast Included', 'En-Suite Bathroom', 'Air Conditioning', '24/7 Front Desk'],
        isStudent: false,
      },
      {
        name: `${formattedName} Heritage Boutique Suites`,
        category: 'Boutique',
        pricePerNight: 135,
        rating: 4.8,
        reviews: 780,
        distance: '0.5 km from Main Attractions',
        facilities: ['Boutique Decor', 'Espresso Bar', 'Luggage Assistance', 'Concierge Service'],
        isStudent: false,
      },
      {
        name: `${formattedName} Grand Panoramic Resort & Spa`,
        category: 'Resort',
        pricePerNight: 240,
        rating: 4.9,
        reviews: 1490,
        distance: '1.2 km from Downtown',
        facilities: ['Infinity Pool', 'Full-Service Spa', 'Fine Dining Restaurant', 'Valet Parking'],
        isStudent: false,
      },
    ],
    scams: [
      'Unofficial taxi operators offering rides at airports without turning on the meter—always use official dispatch lines or ride apps.',
      'Distraction theft in crowded tourist plazas; keep valuables in front zip pockets or crossbody bags.',
    ],
    weatherNote: 'Check the 5-day local forecast before your departure date. Dress in versatile layers suitable for seasonal walking.',
  };
}

export function generateCompleteTripPlan(formData: TripFormData): TripPlan {
  const seed = getDestinationSeed(formData.destination);
  const isStudent = formData.studentMode;
  const numDays = Math.max(1, Math.min(14, formData.days || 3));
  const travelers = Math.max(1, formData.travelers || 1);
  const userBudget = formData.totalBudget || 1500;

  // Day themes based on user interests
  const interestThemes: Record<string, string[]> = {
    History: ['Imperial Past & Ancient Relics', 'Historic Castles & Old Quarters', 'Sacred Shrines & World Heritage'],
    Nature: ['Botanical Escapes & Urban Parks', 'Scenic Waterways & Coastal Views', 'Alpine Panorama & Forest Paths'],
    Culture: ['Artisan Quarters & Folk Traditions', 'World-Class Galleries & Architecture', 'Music, Theater & Street Murals'],
    Food: ['Culinary Markets & Street Tasting', 'Farm-to-Table Gastronomy', 'Sweets, Cafes & Historic Bistros'],
    Shopping: ['Bustling Arcades & Flea Markets', 'Designer Avenues & High Streets', 'Artisan Craft Boutiques'],
    Adventure: ['Active Exploration & Hidden Viewpoints', 'Bicycle Touring & High Trails', 'Night Lights & Urban Discovery'],
    Entertainment: ['Lively Districts & Evening Shows', 'Theme Attractions & Interactive Exhibits', 'Skyline Bars & Night Escapes'],
  };

  const primaryInterest = formData.interests[0] || 'Culture';
  const themeList = interestThemes[primaryInterest] || [
    'Iconic Landmarks & First Impressions',
    'Cultural Heritage & Historic Alleys',
    'Local Flavors & Artisan Streets',
    'Scenic Viewpoints & Urban Greenery',
    'Hidden Gems & Memorable Farewells',
  ];

  const itinerary: DayItinerary[] = [];
  const landmarksPool = [...seed.landmarks];

  for (let d = 1; d <= numDays; d++) {
    const theme = themeList[(d - 1) % themeList.length];
    const morningPlace = landmarksPool[(d * 2 - 2) % landmarksPool.length];
    const afternoonPlace = landmarksPool[(d * 2 - 1) % landmarksPool.length];
    const eveningPlace = `${seed.name} Twilight Promenade & Night Hub`;

    const morningCost = isStudent ? 5 : 18;
    const afternoonCost = isStudent ? 8 : 25;
    const eveningCost = isStudent ? 12 : 35;
    const dailyFoodCost = (isStudent ? 20 : 45) * travelers;
    const estimatedDailyCost = (morningCost + afternoonCost + eveningCost) * travelers + dailyFoodCost;

    itinerary.push({
      dayNumber: d,
      title: `Day ${d}: ${theme}`,
      theme,
      morning: {
        id: `d${d}-morn`,
        time: '09:00 AM – 12:30 PM',
        title: `Morning Exploration at ${morningPlace}`,
        description: `Begin your morning discovering ${morningPlace}. Enjoy the serene morning lighting, beat the midday tour crowds, and take memorable photos.`,
        place: morningPlace,
        estimatedCost: morningCost,
        travelTime: '20 min transit',
        category: 'morning',
        studentSavingNote: isStudent ? 'Free entry before 10 AM or 50% off with Student ID' : undefined,
      },
      afternoon: {
        id: `d${d}-aft`,
        time: '01:30 PM – 05:00 PM',
        title: `Afternoon Highlights at ${afternoonPlace}`,
        description: `Delve into the vibrant atmosphere of ${afternoonPlace}. Browse local artisan stalls, visit adjacent museum wings, and stroll scenic courtyards.`,
        place: afternoonPlace,
        estimatedCost: afternoonCost,
        travelTime: '15 min walk or tram',
        category: 'afternoon',
        studentSavingNote: isStudent ? 'Take advantage of discounted student exhibition access' : undefined,
      },
      evening: {
        id: `d${d}-eve`,
        time: '06:30 PM – 09:30 PM',
        title: `Evening Stroll & Dinner at ${eveningPlace}`,
        description: `Soak in illuminated evening views, vibrant street musicians, and authentic dinner at cozy neighborhood venues.`,
        place: eveningPlace,
        estimatedCost: eveningCost,
        travelTime: '10 min walk',
        category: 'evening',
        studentSavingNote: isStudent ? 'Explore vibrant night street-food stalls instead of sit-down restaurants' : undefined,
      },
      placesToVisit: [morningPlace, afternoonPlace, eveningPlace],
      suggestedFood: {
        breakfast: isStudent ? 'Local Bakery Set & Hot Beverage ($3–$5)' : 'Continental or Traditional Breakfast Set ($10–$14)',
        lunch: isStudent ? 'Market Lunch Bowl / Fast-Casual Specialty ($6–$8)' : 'Bistro Platter & Refreshment ($18–$24)',
        dinner: isStudent ? 'Street Food Night Market Feast ($8–$12)' : 'Seated Regional Dinner ($25–$35)',
        estimatedFoodCost: dailyFoodCost,
      },
      estimatedTravelTime: 'Approx. 45–60 mins total transit',
      estimatedDailyCost,
      notes: isStudent
        ? 'Student tip: Pack water bottles and snacks from supermarkets to avoid tourist markup prices.'
        : 'Tip: Comfortable walking shoes are highly recommended for the day.',
    });
  }

  // Budget calculations tailored to student mode & user choices
  // Category base estimates
  const baseTransitPerDay = isStudent ? 6 : 18;
  const baseHotelPerNight = isStudent ? 35 : formData.accommodationPref === 'Luxury Resort' ? 220 : formData.accommodationPref === 'Boutique Hotel' ? 140 : 85;
  const baseFoodPerDay = isStudent ? 22 : 45;
  const baseActivitiesPerDay = isStudent ? 15 : 35;
  const baseShoppingTotal = isStudent ? 40 : 150;
  const baseEmergency = isStudent ? 50 : 120;

  const totalTransportation = Math.round(baseTransitPerDay * numDays * travelers + (isStudent ? 150 : 320));
  const totalAccommodation = Math.round(baseHotelPerNight * numDays);
  const totalFood = Math.round(baseFoodPerDay * numDays * travelers);
  const totalActivities = Math.round(baseActivitiesPerDay * numDays * travelers);
  const totalShopping = Math.round(baseShoppingTotal * travelers);
  const totalEmergency = Math.round(baseEmergency);

  const totalEstimated = totalTransportation + totalAccommodation + totalFood + totalActivities + totalShopping + totalEmergency;
  const remaining = userBudget - totalEstimated;
  const isOverBudget = remaining < 0;
  const overBudgetAmount = isOverBudget ? Math.abs(remaining) : 0;

  const standardBaseline = (totalTransportation + totalAccommodation + totalFood + totalActivities) * 1.45;
  const studentSavings = isStudent ? Math.round(standardBaseline - totalEstimated) : 0;

  const budget: BudgetBreakdown = {
    transportation: totalTransportation,
    accommodation: totalAccommodation,
    food: totalFood,
    activities: totalActivities,
    shopping: totalShopping,
    emergency: totalEmergency,
    totalEstimated,
    userBudget,
    remaining,
    isOverBudget,
    overBudgetAmount,
    studentSavings,
    savingTips: isStudent
      ? [
          'Stay in certified youth hostels with free breakfast and communal kitchens.',
          'Always carry your International Student Identity Card (ISIC) for 20%–50% monument discounts.',
          'Use unlimited tourist transit passes instead of single tickets or taxis.',
          'Enjoy hearty lunches during lunch-special pricing, and feast on street food in the evening.',
        ]
      : [
          'Book attractions and museum tickets online in advance to unlock early-bird discounts.',
          'Use public rapid transit (subways/trains) for fast, predictable transit without surge fees.',
          'Reserve accommodations 3–4 weeks prior to secure favorable neighborhood rates.',
        ],
  };

  // Accommodations tailored
  const accommodations: AccommodationItem[] = seed.sampleHotels.map((h, idx) => ({
    id: `acc-${idx + 1}`,
    name: h.name,
    location: `${seed.name}, ${seed.country}`,
    pricePerNight: isStudent && h.isStudent ? Math.round(h.pricePerNight * 0.85) : h.pricePerNight,
    totalPrice: (isStudent && h.isStudent ? Math.round(h.pricePerNight * 0.85) : h.pricePerNight) * numDays,
    priceRange: h.pricePerNight < 50 ? '$' : h.pricePerNight < 120 ? '$$' : h.pricePerNight < 220 ? '$$$' : '$$$$',
    rating: h.rating,
    reviewCount: h.reviews,
    distanceFromAttractions: h.distance,
    basicFacilities: h.facilities,
    category: h.category,
    isStudentFriendly: h.isStudent,
    isDemoData: true,
  }));

  // Transportation options
  const transportation: TransportOption[] = [
    {
      id: 'trans-local',
      mode: 'Local Transport',
      title: `${seed.name} Rapid Transit (Metro, Trams & City Buses)`,
      estimatedCost: isStudent ? 25 : 45,
      approximateTime: '15–30 mins between major sights',
      recommendation: 'Top recommendation for daily sightseeing. Highly punctual, comprehensive coverage, and zero traffic delay.',
      isBestForBudget: true,
      isFastest: false,
      isStudentRecommended: true,
      carbonRating: 'Low',
      localTransitTip: 'Purchase a 3-day or 7-day unlimited visitor card to eliminate ticket queues.',
    },
    {
      id: 'trans-train',
      mode: 'Train',
      title: 'High-Speed Rail / Regional Intercity Express',
      estimatedCost: isStudent ? 65 : 120,
      approximateTime: 'Varies by route (approx. 1.5–3 hrs)',
      recommendation: 'Ideal if traveling between adjacent cities or arriving from nearby regional hubs. Spacious, scenic, and reliable.',
      isBestForBudget: false,
      isFastest: true,
      isStudentRecommended: true,
      carbonRating: 'Low',
      localTransitTip: 'Book rail passes in advance to lock in promotional youth and off-peak fares.',
    },
    {
      id: 'trans-flight',
      mode: 'Flight',
      title: `Commercial Flights to ${seed.name} Airport`,
      estimatedCost: isStudent ? 180 : 320,
      approximateTime: '2–6 hours flight time',
      recommendation: 'Best for long-distance arrival. Look for budget carriers and travel with carry-on luggage only to avoid baggage fees.',
      isBestForBudget: false,
      isFastest: true,
      isStudentRecommended: false,
      carbonRating: 'High',
      localTransitTip: 'Use airport express trains instead of airport taxis to reach downtown in half the time for 1/4th the price.',
    },
    {
      id: 'trans-bus',
      mode: 'Bus',
      title: 'Intercity Coach & Express Shuttle',
      estimatedCost: isStudent ? 18 : 35,
      approximateTime: '3–5 hours depending on distance',
      recommendation: 'Unbeatable price for budget and student travelers. Modern coaches feature USB charging, AC, and Wi-Fi.',
      isBestForBudget: true,
      isFastest: false,
      isStudentRecommended: true,
      carbonRating: 'Low',
      localTransitTip: 'Overnight coaches also save you a full night of hotel accommodation costs!',
    },
    {
      id: 'trans-cab',
      mode: 'Cab',
      title: 'On-Demand Rideshare & Licensed Taxis',
      estimatedCost: isStudent ? 90 : 160,
      approximateTime: '20–45 mins (subject to traffic)',
      recommendation: 'Convenient for late nights or heavy luggage transfers. Share rides among group travelers to split costs.',
      isBestForBudget: false,
      isFastest: false,
      isStudentRecommended: false,
      carbonRating: 'Medium',
      localTransitTip: 'Always verify that the meter is running or use official apps with upfront fixed pricing.',
    },
  ];

  // Food guide
  const foodGuide: FoodGuideItem[] = seed.foods.map((f, idx) => ({
    id: `food-${idx + 1}`,
    name: f.name,
    localName: f.localName,
    type: idx === 3 ? 'Dessert' : idx === 4 ? 'Street Food' : 'Dish',
    dietary: f.veg ? 'Vegetarian' : 'Non-Vegetarian',
    description: f.desc,
    approximateCost: isStudent ? Math.round(f.cost * 0.8) : f.cost,
    whereToTry: `Popular eateries, food alleys, and traditional markets in ${seed.name}`,
    isStudentBudgetFriendly: f.cost <= 10,
  }));

  // Local cultural guide
  const localGuide: LocalCulturalGuide = {
    localLanguage: seed.language,
    keyPhrases: seed.phrases,
    currency: seed.currency,
    currencyTip: `Pay with local cards where accepted, but always carry a modest cash buffer for small vendors, tips, and street carts.`,
    culturalTips: seed.culturalTips,
    localTransitTips: seed.transitTips,
  };

  // Safety alerts
  const safetyAlerts: SafetyAlertItem[] = [
    {
      id: 'safe-1',
      category: 'Emergency',
      title: `Emergency Dispatch & Tourist Assistance in ${seed.name}`,
      description: `Police: ${seed.emergency.police} | Ambulance/Medical: ${seed.emergency.ambulance} | Tourist Helpline: ${seed.emergency.touristPolice}.`,
      severity: 'low',
      actionTip: 'Save these numbers in your phone contacts or print your offline trip guide.',
      isDemoNotice: false,
    },
    {
      id: 'safe-2',
      category: 'Scam Alert',
      title: 'Common Tourist Traps & Vigilance',
      description: seed.scams[0] || 'Beware of unsolicited street solicitors offering cheap jewelry or high-pressure guided tours.',
      severity: 'medium',
      actionTip: 'Politely decline and keep walking towards well-lit public squares.',
      isDemoNotice: true,
    },
    {
      id: 'safe-3',
      category: 'Weather',
      title: `Weather & Packing Advisory for ${seed.name}`,
      description: seed.weatherNote,
      severity: 'low',
      actionTip: 'Pack versatile layers, comfortable walking shoes, and a compact umbrella.',
      isDemoNotice: true,
    },
    {
      id: 'safe-4',
      category: 'Health',
      title: 'Health, Hydration & Travel Insurance',
      description: 'Ensure you have active overseas travel health insurance coverage and carry any personal prescription medicines in original labeled containers.',
      severity: 'low',
      actionTip: 'Carry a reusable water bottle and hand sanitizer in your daypack.',
      isDemoNotice: true,
    },
  ];

  return {
    id: `trip-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    formData,
    itinerary,
    budget,
    accommodations,
    transportation,
    foodGuide,
    localGuide,
    safetyAlerts,
    emergencyContacts: seed.emergency,
    isOfflineSaved: false,
    generatedWithAI: true,
  };
}

export const DEFAULT_INITIAL_TRIP = generateCompleteTripPlan({
  destination: 'Tokyo',
  startingLocation: 'San Francisco',
  days: 5,
  travelDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
  travelers: 1,
  totalBudget: 1800,
  currency: 'USD',
  travelType: 'Solo',
  interests: ['Culture', 'Food', 'History'],
  preferredTransport: 'Local Transport',
  accommodationPref: 'Hostel/Budget',
  foodPref: 'Local Street Food',
  studentMode: false,
});
