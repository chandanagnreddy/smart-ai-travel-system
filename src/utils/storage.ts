import { TripPlan } from '../types';
import { DEFAULT_INITIAL_TRIP } from '../data/destinations';

const ACTIVE_TRIP_KEY = 'smart_travel_active_trip';
const SAVED_TRIPS_KEY = 'smart_travel_saved_trips';
const OFFLINE_GUIDES_KEY = 'smart_travel_offline_guides';

export function getActiveTrip(): TripPlan {
  try {
    const data = localStorage.getItem(ACTIVE_TRIP_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read active trip from localStorage', err);
  }
  return DEFAULT_INITIAL_TRIP;
}

export function saveActiveTrip(trip: TripPlan): void {
  try {
    localStorage.setItem(ACTIVE_TRIP_KEY, JSON.stringify(trip));
  } catch (err) {
    console.error('Failed to save active trip to localStorage', err);
  }
}

export function getSavedTrips(): TripPlan[] {
  try {
    const data = localStorage.getItem(SAVED_TRIPS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load saved trips', err);
  }
  // If empty, initialize with default trip saved
  return [DEFAULT_INITIAL_TRIP];
}

export function saveTripToLibrary(trip: TripPlan): TripPlan[] {
  try {
    const existing = getSavedTrips();
    const filtered = existing.filter((t) => t.id !== trip.id);
    const updated = [trip, ...filtered];
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save trip to library', err);
    return [trip];
  }
}

export function deleteSavedTrip(tripId: string): TripPlan[] {
  try {
    const existing = getSavedTrips();
    const updated = existing.filter((t) => t.id !== tripId);
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete trip', err);
    return [];
  }
}

export function saveTripOffline(trip: TripPlan): void {
  try {
    const offlineTrip = { ...trip, isOfflineSaved: true };
    saveActiveTrip(offlineTrip);
    saveTripToLibrary(offlineTrip);

    // Also store in offline guides key
    const existingRaw = localStorage.getItem(OFFLINE_GUIDES_KEY);
    const existing: TripPlan[] = existingRaw ? JSON.parse(existingRaw) : [];
    const filtered = existing.filter((t) => t.id !== trip.id);
    localStorage.setItem(OFFLINE_GUIDES_KEY, JSON.stringify([offlineTrip, ...filtered]));
  } catch (err) {
    console.error('Failed to save offline guide', err);
  }
}

export function getOfflineSavedTrips(): TripPlan[] {
  try {
    const data = localStorage.getItem(OFFLINE_GUIDES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to get offline saved trips', err);
  }
  return [];
}

export function generateOfflineTextGuide(trip: TripPlan): string {
  const f = trip.formData;
  let text = `=====================================================\n`;
  text += `SMART AI TRAVEL SYSTEM – OFFLINE TRAVEL GUIDE\n`;
  text += `Plan. Explore. Travel Smarter.\n`;
  text += `=====================================================\n\n`;

  text += `DESTINATION: ${f.destination.toUpperCase()}\n`;
  text += `Origin: ${f.startingLocation} | Departure: ${f.travelDate}\n`;
  text += `Duration: ${f.days} Days | Travelers: ${f.travelers} | Travel Style: ${f.travelType}\n`;
  text += `Total Budget: $${f.totalBudget.toLocaleString()} (${f.studentMode ? 'STUDENT MODE ACTIVE' : 'Standard Mode'})\n\n`;

  text += `-----------------------------------------------------\n`;
  text += `EMERGENCY INFORMATION & CONTACTS\n`;
  text += `-----------------------------------------------------\n`;
  text += `Police: ${trip.emergencyContacts.police}\n`;
  text += `Ambulance: ${trip.emergencyContacts.ambulance}\n`;
  text += `Tourist Assistance: ${trip.emergencyContacts.touristPolice}\n`;
  text += `General Emergency: ${trip.emergencyContacts.emergencyGeneral}\n`;
  text += `Embassy / Consular Hotline: ${trip.emergencyContacts.embassyHotline}\n\n`;

  text += `-----------------------------------------------------\n`;
  text += `LOCAL LANGUAGE ESSENTIAL PHRASES (${trip.localGuide.localLanguage})\n`;
  text += `-----------------------------------------------------\n`;
  trip.localGuide.keyPhrases.forEach((p) => {
    text += `• ${p.phrase} -> ${p.translation} (Pronounced: ${p.pronunciation})\n`;
  });
  text += `\nCurrency: ${trip.localGuide.currency}\n`;
  text += `Currency Tip: ${trip.localGuide.currencyTip}\n\n`;

  text += `-----------------------------------------------------\n`;
  text += `DAY-BY-DAY ITINERARY\n`;
  text += `-----------------------------------------------------\n`;
  trip.itinerary.forEach((d) => {
    text += `\n[DAY ${d.dayNumber}] ${d.title}\n`;
    text += `  • Morning: ${d.morning.title} (${d.morning.time})\n`;
    text += `    Details: ${d.morning.description}\n`;
    text += `    Est. Cost: $${d.morning.estimatedCost} | Transit: ${d.morning.travelTime}\n`;
    text += `  • Afternoon: ${d.afternoon.title} (${d.afternoon.time})\n`;
    text += `    Details: ${d.afternoon.description}\n`;
    text += `    Est. Cost: $${d.afternoon.estimatedCost} | Transit: ${d.afternoon.travelTime}\n`;
    text += `  • Evening: ${d.evening.title} (${d.evening.time})\n`;
    text += `    Details: ${d.evening.description}\n`;
    text += `    Est. Cost: $${d.evening.estimatedCost}\n`;
    text += `  • Meals: Breakfast (${d.suggestedFood.breakfast}) | Lunch (${d.suggestedFood.lunch}) | Dinner (${d.suggestedFood.dinner})\n`;
    text += `  • Daily Est. Total: $${d.estimatedDailyCost}\n`;
  });

  text += `\n-----------------------------------------------------\n`;
  text += `RECOMMENDED ACCOMMODATION (SAMPLE DATA)\n`;
  text += `-----------------------------------------------------\n`;
  trip.accommodations.forEach((a) => {
    text += `• ${a.name} (${a.category}) - $${a.pricePerNight}/night (Rating: ${a.rating}/5)\n`;
    text += `  Location: ${a.location} | Proximity: ${a.distanceFromAttractions}\n`;
    text += `  Facilities: ${a.basicFacilities.join(', ')}\n\n`;
  });

  text += `-----------------------------------------------------\n`;
  text += `BUDGET BREAKDOWN\n`;
  text += `-----------------------------------------------------\n`;
  text += `Transportation: $${trip.budget.transportation}\n`;
  text += `Accommodation: $${trip.budget.accommodation}\n`;
  text += `Food: $${trip.budget.food}\n`;
  text += `Activities: $${trip.budget.activities}\n`;
  text += `Shopping: $${trip.budget.shopping}\n`;
  text += `Emergency buffer: $${trip.budget.emergency}\n`;
  text += `TOTAL ESTIMATED: $${trip.budget.totalEstimated} (Your Budget: $${trip.budget.userBudget})\n`;
  if (trip.budget.studentSavings > 0) {
    text += `Student Mode Savings: $${trip.budget.studentSavings} saved!\n`;
  }

  text += `\n* Note: Offline Guide saved from Smart AI Travel System.\n`;
  return text;
}

export function toggleOfflineStatus(tripId: string): boolean {
  try {
    const existing = getSavedTrips();
    let newStatus = true;
    const updated = existing.map((t) => {
      if (t.id === tripId) {
        newStatus = !t.isOfflineSaved;
        return { ...t, isOfflineSaved: newStatus };
      }
      return t;
    });
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));

    const active = getActiveTrip();
    if (active.id === tripId) {
      saveActiveTrip({ ...active, isOfflineSaved: newStatus });
    }
    return newStatus;
  } catch (err) {
    console.error('Failed to toggle offline status', err);
    return true;
  }
}

// Convenient export aliases
export const loadActiveTrip = getActiveTrip;
export const loadSavedTrips = getSavedTrips;
export const saveTripToStorage = saveTripToLibrary;
export const deleteTripFromStorage = deleteSavedTrip;

