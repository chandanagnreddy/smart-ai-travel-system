export type TravelType = 'Solo' | 'Family' | 'Friends' | 'Couple';

export type InterestType =
  | 'Nature'
  | 'Adventure'
  | 'History'
  | 'Shopping'
  | 'Food'
  | 'Culture'
  | 'Entertainment';

export type TransportPreference =
  | 'Flight'
  | 'Train'
  | 'Bus'
  | 'Cab'
  | 'Local Transport';

export type AccommodationPreference =
  | 'Hostel/Budget'
  | 'Boutique Hotel'
  | 'Luxury Resort'
  | 'Vacation Rental';

export type FoodPreference =
  | 'Local Street Food'
  | 'Vegetarian/Vegan'
  | 'Halal'
  | 'Mixed/Everything'
  | 'Fine Dining';

export interface TripFormData {
  destination: string;
  startingLocation: string;
  days: number;
  travelDate: string;
  travelers: number;
  totalBudget: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY';
  travelType: TravelType;
  interests: InterestType[];
  preferredTransport: TransportPreference;
  accommodationPref: AccommodationPreference;
  foodPref: FoodPreference;
  studentMode: boolean;
}

export interface DayActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  place: string;
  estimatedCost: number;
  travelTime: string;
  category: 'morning' | 'afternoon' | 'evening';
  studentSavingNote?: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  theme: string;
  morning: DayActivity;
  afternoon: DayActivity;
  evening: DayActivity;
  placesToVisit: string[];
  suggestedFood: {
    breakfast: string;
    lunch: string;
    dinner: string;
    estimatedFoodCost: number;
  };
  estimatedTravelTime: string;
  estimatedDailyCost: number;
  notes?: string;
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  activities: number;
  shopping: number;
  emergency: number;
  totalEstimated: number;
  userBudget: number;
  remaining: number;
  isOverBudget: boolean;
  overBudgetAmount: number;
  studentSavings: number;
  savingTips: string[];
}

export interface AccommodationItem {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  totalPrice: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  distanceFromAttractions: string;
  basicFacilities: string[];
  category: 'Hostel' | 'Hotel' | 'Boutique' | 'Resort';
  isStudentFriendly: boolean;
  isDemoData: boolean;
}

export interface TransportOption {
  id: string;
  mode: 'Bus' | 'Train' | 'Flight' | 'Cab' | 'Local Transport';
  title: string;
  estimatedCost: number;
  approximateTime: string;
  recommendation: string;
  isBestForBudget: boolean;
  isFastest: boolean;
  isStudentRecommended: boolean;
  carbonRating: 'Low' | 'Medium' | 'High';
  localTransitTip: string;
}

export interface FoodGuideItem {
  id: string;
  name: string;
  localName?: string;
  type: 'Dish' | 'Street Food' | 'Dessert' | 'Beverage';
  dietary: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Halal' | 'Flexible';
  description: string;
  approximateCost: number;
  whereToTry: string;
  isStudentBudgetFriendly: boolean;
}

export interface CulturalPhrase {
  phrase: string;
  translation: string;
  pronunciation: string;
}

export interface LocalCulturalGuide {
  localLanguage: string;
  keyPhrases: CulturalPhrase[];
  currency: string;
  currencyTip: string;
  culturalTips: string[];
  localTransitTips: string[];
}

export interface SafetyAlertItem {
  id: string;
  category: 'Emergency' | 'Advisory' | 'Scam Alert' | 'Weather' | 'Health';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  actionTip: string;
  isDemoNotice: boolean;
}

export interface EmergencyContacts {
  police: string;
  ambulance: string;
  touristPolice: string;
  emergencyGeneral: string;
  embassyHotline: string;
}

export interface TripPlan {
  id: string;
  createdAt: string;
  formData: TripFormData;
  itinerary: DayItinerary[];
  budget: BudgetBreakdown;
  accommodations: AccommodationItem[];
  transportation: TransportOption[];
  foodGuide: FoodGuideItem[];
  localGuide: LocalCulturalGuide;
  safetyAlerts: SafetyAlertItem[];
  emergencyContacts: EmergencyContacts;
  isOfflineSaved: boolean;
  generatedWithAI: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string | number;
  source?: 'gemini' | 'demo_curated';
  note?: string;
}
