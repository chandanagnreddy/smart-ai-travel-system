import { WeatherForecastData, WeatherForecastDay, WeatherHourlySlot } from '../types';

interface DestinationClimate {
  baseTempC: number;
  tempVariance: number;
  humidityBase: number;
  windBaseKmH: number;
  uvBase: number;
  conditions: Array<{
    condition: string;
    icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-rain' | 'cloud-drizzle' | 'cloud-lightning' | 'wind';
    suitability: 'Ideal for Outdoors' | 'Great Exploring' | 'Passing Showers' | 'Indoor Preferred';
    pop: number;
    tip: string;
    clothing: string;
  }>;
  packingTip: string;
  advisory: string;
}

const CLIMATE_PROFILES: Record<string, DestinationClimate> = {
  tokyo: {
    baseTempC: 21,
    tempVariance: 4,
    humidityBase: 58,
    windBaseKmH: 12,
    uvBase: 6,
    conditions: [
      {
        condition: 'Clear & Sunny',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 5,
        tip: 'Perfect clear skies for visiting Senso-ji, Meiji Shrine, and Tokyo Skytree observation decks.',
        clothing: 'Comfortable walking sneakers, light casual layers, and sunglasses.',
      },
      {
        condition: 'Mild & Partly Cloudy',
        icon: 'cloud-sun',
        suitability: 'Ideal for Outdoors',
        pop: 15,
        tip: 'Pleasant temperatures for Shibuya crossing, Harajuku shopping, and park strolls.',
        clothing: 'Light cardigan or jacket for cooler shaded alleys and evening breezes.',
      },
      {
        condition: 'Scattered Afternoon Showers',
        icon: 'cloud-rain',
        suitability: 'Passing Showers',
        pop: 55,
        tip: 'Pass by Akihabara anime malls or teamLab Planets during late afternoon drizzle.',
        clothing: 'Compact folding umbrella, water-resistant footwear, light raincoat.',
      },
      {
        condition: 'Breezy & Fair',
        icon: 'wind',
        suitability: 'Great Exploring',
        pop: 10,
        tip: 'Crisp coastal air along Odaiba waterfront and Sumida river cruise.',
        clothing: 'Windbreaker jacket or light scarf for open waterfront promenades.',
      },
      {
        condition: 'Pleasant Sun & Clouds',
        icon: 'cloud-sun',
        suitability: 'Great Exploring',
        pop: 10,
        tip: 'Optimal photography lighting at Shinjuku Gyoen National Garden.',
        clothing: 'Breathable casual layers and sun protection.',
      },
    ],
    packingTip: 'Pack easy-to-remove walking shoes for traditional tatami entryways, plus a compact folding umbrella.',
    advisory: 'Stable temperate weather. Moderate UV index during midday; comfortable walking climate all day.',
  },
  paris: {
    baseTempC: 18,
    tempVariance: 3,
    humidityBase: 65,
    windBaseKmH: 14,
    uvBase: 5,
    conditions: [
      {
        condition: 'Mild European Sun',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 10,
        tip: 'Superb weather for an Eiffel Tower lawn picnic and Montmartre artistic wanderings.',
        clothing: 'Classic trench coat, stylish walking shoes, sunglasses.',
      },
      {
        condition: 'Passing Morning Drizzle',
        icon: 'cloud-drizzle',
        suitability: 'Indoor Preferred',
        pop: 50,
        tip: 'Spend the morning admiring masterpieces inside the Louvre or Musée d’Orsay.',
        clothing: 'Water-resistant light coat, warm scarf, closed-toe leather walking shoes.',
      },
      {
        condition: 'Partly Cloudy & Crisp',
        icon: 'cloud-sun',
        suitability: 'Great Exploring',
        pop: 20,
        tip: 'Ideal outdoor cafe seating along Saint-Germain-des-Prés.',
        clothing: 'Mid-weight sweater, breathable cotton tee, stylish scarf.',
      },
      {
        condition: 'Overcast & Calm',
        icon: 'cloud',
        suitability: 'Great Exploring',
        pop: 25,
        tip: 'Great diffused lighting for Sainte-Chapelle stained glass and Latin Quarter bookstores.',
        clothing: 'Light layered coat and comfortable city walking shoes.',
      },
      {
        condition: 'Sunny with Gentle Breeze',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 5,
        tip: 'Take an open-air Seine River sunset cruise or stroll the Tuileries Garden.',
        clothing: 'Light jacket for the breeze on the water, sunglasses.',
      },
    ],
    packingTip: 'A versatile chic trench coat and comfortable flat walking shoes for Parisian cobblestones are essentials.',
    advisory: 'Typical Parisian maritime climate. Occasional brief showers; pleasant temperate afternoon strolls.',
  },
  bali: {
    baseTempC: 29,
    tempVariance: 2,
    humidityBase: 78,
    windBaseKmH: 10,
    uvBase: 10,
    conditions: [
      {
        condition: 'Tropical Sunshine',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 15,
        tip: 'Early morning Mount Batur sunrise hike or Uluwatu cliff temple exploration.',
        clothing: 'High SPF sunscreen (SPF 50+), UV sunglasses, breathable linen attire.',
      },
      {
        condition: 'Warm & Humid with Clouds',
        icon: 'cloud-sun',
        suitability: 'Great Exploring',
        pop: 25,
        tip: 'Wander through the shaded lush Tegallalang Rice Terraces and Ubud Monkey Forest.',
        clothing: 'Moisture-wicking activewear, insect repellent, sun hat.',
      },
      {
        condition: 'Brief Tropical Downpour',
        icon: 'cloud-rain',
        suitability: 'Passing Showers',
        pop: 65,
        tip: 'Relax at a traditional Balinese spa or organic cafe while the refreshing 30-minute shower passes.',
        clothing: 'Waterproof pouch for electronics, quick-drying sandals or water shoes.',
      },
      {
        condition: 'Golden Coastal Sun',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 10,
        tip: 'Perfect surfing and beach relaxation at Canggu, Seminyak, or Uluwatu breaks.',
        clothing: 'Swimwear, light cover-up sarong, polarized sunglasses.',
      },
      {
        condition: 'Warm Island Breeze',
        icon: 'wind',
        suitability: 'Great Exploring',
        pop: 20,
        tip: 'Watch the Tanah Lot temple sunset and enjoy fresh grilled seafood on Jimbaran beach.',
        clothing: 'Breezy linen shirt and temple-appropriate sarong waist wrap.',
      },
    ],
    packingTip: 'Reef-safe sunscreen, temple sarong, mosquito repellent spray, and quick-drying lightweight clothes.',
    advisory: 'High tropical UV index (9–10). Stay hydrated throughout the day and seek shade between 11 AM and 2 PM.',
  },
  'new york': {
    baseTempC: 22,
    tempVariance: 4,
    humidityBase: 52,
    windBaseKmH: 16,
    uvBase: 6,
    conditions: [
      {
        condition: 'Crisp & Bright Sunshine',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 5,
        tip: 'Take a morning walk across Brooklyn Bridge and explore Central Park Great Lawn.',
        clothing: 'Comfortable sneakers with arch support, sunglasses, layered denim jacket.',
      },
      {
        condition: 'Partly Cloudy & Breezy',
        icon: 'cloud-sun',
        suitability: 'Great Exploring',
        pop: 15,
        tip: 'Walk the High Line elevated park and shop through Chelsea Market food hall.',
        clothing: 'Light sweater or zip hoodie for brisk avenue wind tunnels.',
      },
      {
        condition: 'Scattered Showers',
        icon: 'cloud-rain',
        suitability: 'Indoor Preferred',
        pop: 60,
        tip: 'Spend the rainy afternoon inside The Metropolitan Museum of Art or MoMA.',
        clothing: 'Sturdy windproof umbrella, water-resistant shoes, hooded trench.',
      },
      {
        condition: 'Clear Blue Skies',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 10,
        tip: 'Panoramic skyline vistas from Top of the Rock or One World Observatory.',
        clothing: 'Casual urban wear, comfortable walking boots, shades.',
      },
      {
        condition: 'Cool & Overcast',
        icon: 'cloud',
        suitability: 'Great Exploring',
        pop: 20,
        tip: 'Explore Greenwich Village jazz cafes and catch an evening Broadway show in Times Square.',
        clothing: 'Medium warmth stylish jacket, comfortable evening walking footwear.',
      },
    ],
    packingTip: 'Expect 12,000–18,000 daily walking steps: quality cushioned walking shoes are your highest priority.',
    advisory: 'Brisk wind tunnels between skyscrapers. Moderate UV; temperature cools quickly after 6:00 PM sunset.',
  },
  rome: {
    baseTempC: 24,
    tempVariance: 3,
    humidityBase: 50,
    windBaseKmH: 10,
    uvBase: 7,
    conditions: [
      {
        condition: 'Sunny Mediterranean Sky',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 5,
        tip: 'Ideal morning light for the Colosseum exterior and Roman Forum archaeological park.',
        clothing: 'Breathable linen pants, wide-brim sun hat, sunglasses, walking shoes.',
      },
      {
        condition: 'Warm Golden Haze',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 10,
        tip: 'Toss a coin into Trevi Fountain and climb the Spanish Steps with an artisan gelato.',
        clothing: 'Light cotton shirt, sun protection, refillable bottle for Rome’s "nasoni" water fountains.',
      },
      {
        condition: 'Partly Cloudy',
        icon: 'cloud-sun',
        suitability: 'Great Exploring',
        pop: 20,
        tip: 'Marvel at the Pantheon dome oculus and Vatican Museums / St. Peter’s Basilica.',
        clothing: 'Modest attire covering shoulders and knees (strictly required for Vatican & basilicas).',
      },
      {
        condition: 'Passing Afternoon Cloud',
        icon: 'cloud',
        suitability: 'Great Exploring',
        pop: 25,
        tip: 'Stroll the historic cobblestone alleys of Trastevere and enjoy a classic cacio e pepe dinner.',
        clothing: 'Light stylish cardigan for breezy open piazzas at dusk.',
      },
      {
        condition: 'Clear & Radiant Sun',
        icon: 'sun',
        suitability: 'Ideal for Outdoors',
        pop: 5,
        tip: 'Take in panoramic hilltop views over Rome from the Orange Garden (Giardino degli Aranci).',
        clothing: 'Comfortable footwear with grip for smooth historic cobblestones.',
      },
    ],
    packingTip: 'Carry a lightweight scarf to drape over shoulders for cathedral entries and a refillable stainless steel bottle.',
    advisory: 'Warm Mediterranean sun with clear skies. Public drinking fountains (Nasoni) provide free ice-cold spring water.',
  },
};

/**
 * Deterministic hash algorithm to compute stable climate profile for any unseeded city
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getFallbackClimate(destinationName: string): DestinationClimate {
  const hash = hashString(destinationName.toLowerCase());
  // Base temperature between 16°C and 27°C
  const baseTempC = 16 + (hash % 12);
  const humidityBase = 45 + (hash % 35);
  const windBaseKmH = 8 + (hash % 14);
  const uvBase = 4 + (hash % 6);

  const conditionPool: DestinationClimate['conditions'] = [
    {
      condition: 'Clear & Sunny',
      icon: 'sun',
      suitability: 'Ideal for Outdoors',
      pop: 5 + (hash % 10),
      tip: `Excellent bright skies for discovering the central landmarks of ${destinationName}.`,
      clothing: 'Light breathable clothing, sunglasses, and comfortable walking shoes.',
    },
    {
      condition: 'Mild & Partly Cloudy',
      icon: 'cloud-sun',
      suitability: 'Ideal for Outdoors',
      pop: 15 + (hash % 15),
      tip: `Pleasant moderate temperatures ideal for neighborhood walks and city parks in ${destinationName}.`,
      clothing: 'Layered casual wear with a light pullover or cardigan.',
    },
    {
      condition: 'Overcast & Mild',
      icon: 'cloud',
      suitability: 'Great Exploring',
      pop: 25 + (hash % 20),
      tip: `Soft overcast light; great for photography, local cafes, and architectural walking routes.`,
      clothing: 'Light jacket, closed walking shoes, and a light scarf.',
    },
    {
      condition: 'Passing Light Showers',
      icon: 'cloud-drizzle',
      suitability: 'Passing Showers',
      pop: 45 + (hash % 25),
      tip: `Occasional brief drizzle; perfect window for museums, markets, or indoor food courts.`,
      clothing: 'Compact folding travel umbrella and water-resistant footwear.',
    },
    {
      condition: 'Breezy & Refreshing',
      icon: 'wind',
      suitability: 'Great Exploring',
      pop: 10 + (hash % 10),
      tip: `Clear air and scenic viewpoints across ${destinationName}.`,
      clothing: 'Windbreaker jacket or light fleece for outdoor observation decks.',
    },
  ];

  return {
    baseTempC,
    tempVariance: 3,
    humidityBase,
    windBaseKmH,
    uvBase,
    conditions: conditionPool,
    packingTip: `Comfortable walking footwear, versatile weather-adaptive layers, and a compact travel umbrella.`,
    advisory: `Favorable seasonal travel conditions. Daytime highs are pleasant for walking itineraries.`,
  };
}

/**
 * Generates a realistic 5-day weather forecast preview card dataset
 */
export function generate5DayWeatherForecast(
  destination: string,
  travelDateStr?: string
): WeatherForecastData {
  const normDest = destination.trim().toLowerCase();
  // Match key from CLIMATE_PROFILES if contains substring or match
  let profileKey = Object.keys(CLIMATE_PROFILES).find((k) => normDest.includes(k) || k.includes(normDest));
  const climate = profileKey ? CLIMATE_PROFILES[profileKey] : getFallbackClimate(destination);

  // Compute reference starting date
  let startDate = new Date();
  if (travelDateStr) {
    const parsed = new Date(travelDateStr);
    if (!isNaN(parsed.getTime())) {
      startDate = parsed;
    }
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const forecastDays: WeatherForecastDay[] = [];

  for (let i = 0; i < 5; i++) {
    const dayDate = new Date(startDate.getTime() + i * 86400000);
    const dayName = daysOfWeek[dayDate.getDay()];
    const formattedDate = `${dayDate.toLocaleDateString('en-US', { weekday: 'short' })}, ${months[dayDate.getMonth()]} ${dayDate.getDate()}`;
    const dateIso = dayDate.toISOString().split('T')[0];

    const cond = climate.conditions[i % climate.conditions.length];

    // Temperature calculations with day variance
    const dayOffset = ((i * 3 - 2) % 4);
    const tempMaxC = climate.baseTempC + dayOffset;
    const tempMinC = climate.baseTempC - (climate.tempVariance + 2) + (dayOffset > 0 ? 1 : -1);

    const tempMaxF = Math.round((tempMaxC * 9) / 5 + 32);
    const tempMinF = Math.round((tempMinC * 9) / 5 + 32);

    // Dynamic hourly slots for this day
    const morningTempC = tempMinC + 3;
    const middayTempC = tempMaxC;
    const afternoonTempC = tempMaxC - 1;
    const nightTempC = tempMinC + 1;

    const hourlySlots: WeatherHourlySlot[] = [
      {
        time: '08:00 AM',
        period: 'Morning',
        tempC: morningTempC,
        tempF: Math.round((morningTempC * 9) / 5 + 32),
        condition: cond.icon === 'cloud-rain' ? 'Light Mist' : 'Crisp & Clear',
        icon: cond.icon === 'cloud-rain' ? 'cloud-drizzle' : 'sun',
        pop: Math.max(0, cond.pop - 10),
      },
      {
        time: '01:00 PM',
        period: 'Afternoon',
        tempC: middayTempC,
        tempF: Math.round((middayTempC * 9) / 5 + 32),
        condition: cond.condition,
        icon: cond.icon,
        pop: cond.pop,
      },
      {
        time: '05:30 PM',
        period: 'Evening',
        tempC: afternoonTempC,
        tempF: Math.round((afternoonTempC * 9) / 5 + 32),
        condition: 'Golden Twilight',
        icon: 'cloud-sun',
        pop: Math.max(5, cond.pop - 5),
      },
      {
        time: '09:00 PM',
        period: 'Night',
        tempC: nightTempC,
        tempF: Math.round((nightTempC * 9) / 5 + 32),
        condition: 'Starlit & Cool',
        icon: 'cloud',
        pop: Math.max(0, cond.pop - 15),
      },
    ];

    forecastDays.push({
      dayNumber: i + 1,
      date: dateIso,
      formattedDate,
      dayName,
      condition: cond.condition,
      icon: cond.icon,
      tempMaxC,
      tempMinC,
      tempMaxF,
      tempMinF,
      precipitationChance: cond.pop,
      humidity: Math.min(95, climate.humidityBase + (i % 2 === 0 ? 4 : -3)),
      windSpeedKmH: climate.windBaseKmH + (i % 3),
      uvIndex: Math.max(1, climate.uvBase - (cond.icon === 'cloud-rain' ? 3 : 0)),
      sunrise: '06:14 AM',
      sunset: '05:52 PM',
      clothingTip: cond.clothing,
      travelSuitability: cond.suitability,
      activityRecommendation: cond.tip,
      hourlySlots,
    });
  }

  const currentDay = forecastDays[0];
  const currentTempC = currentDay.tempMaxC - 1;
  const currentTempF = Math.round((currentTempC * 9) / 5 + 32);
  const feelsLikeC = currentTempC + (currentDay.humidity > 70 ? 2 : -1);
  const feelsLikeF = Math.round((feelsLikeC * 9) / 5 + 32);

  return {
    destination,
    currentTempC,
    currentTempF,
    currentCondition: currentDay.condition,
    currentIcon: currentDay.icon,
    feelsLikeC,
    feelsLikeF,
    humidity: currentDay.humidity,
    windSpeedKmH: currentDay.windSpeedKmH,
    uvIndex: currentDay.uvIndex,
    airQualityStatus: currentDay.uvIndex > 8 ? 'Moderate' : 'Excellent',
    generalAdvisory: climate.advisory,
    packingTip: climate.packingTip,
    isSimulatedPreview: true,
    dataSourceLabel: 'Simulated Real-Time Meteorological Telemetry (GFS / ECMWF Ensemble Preview)',
    lastUpdatedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    forecastDays,
  };
}
