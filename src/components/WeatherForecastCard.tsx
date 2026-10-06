import React, { useState } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  RefreshCw,
  Umbrella,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { WeatherForecastData, WeatherForecastDay, WeatherHourlySlot } from '../types';

interface WeatherForecastCardProps {
  weather: WeatherForecastData;
  selectedDayNum?: number;
  onSelectDay?: (dayNumber: number) => void;
  onRefreshForecast?: () => void;
}

export const WeatherForecastCard: React.FC<WeatherForecastCardProps> = ({
  weather,
  selectedDayNum = 1,
  onSelectDay,
  onRefreshForecast,
}) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showHourly, setShowHourly] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(weather.lastUpdatedTime);

  const activeForecastDay =
    weather.forecastDays.find((d) => d.dayNumber === selectedDayNum) || weather.forecastDays[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
      onRefreshForecast?.();
    }, 700);
  };

  const renderWeatherIcon = (
    icon: WeatherForecastDay['icon'],
    className = 'w-6 h-6'
  ) => {
    switch (icon) {
      case 'sun':
        return <Sun className={`${className} text-amber-500 animate-pulse`} />;
      case 'cloud-sun':
        return <CloudSun className={`${className} text-sky-500`} />;
      case 'cloud-rain':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'cloud-drizzle':
        return <CloudDrizzle className={`${className} text-teal-500`} />;
      case 'cloud-lightning':
        return <CloudLightning className={`${className} text-indigo-500`} />;
      case 'wind':
        return <Wind className={`${className} text-teal-600`} />;
      case 'cloud':
      default:
        return <Cloud className={`${className} text-slate-400`} />;
    }
  };

  const getSuitabilityColor = (suitability: WeatherForecastDay['travelSuitability']) => {
    switch (suitability) {
      case 'Ideal for Outdoors':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Great Exploring':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Passing Showers':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Indoor Preferred':
      default:
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6 overflow-hidden relative">
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/5 via-sky-500/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold">
              <CloudSun className="w-3.5 h-3.5" />
              <span>5-Day Meteorological Forecast</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-medium">
              <Info className="w-3 h-3" />
              <span>Simulated Live Radar & Sensor Feed</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Forecast Preview for {weather.destination}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Anticipated travel weather, precipitation probabilities, and activity recommendations for your trip dates.
          </p>
        </div>

        {/* Action Controls: Unit Toggle & Live Refresh Simulation */}
        <div className="flex items-center gap-2.5 self-start md:self-center">
          {/* Unit Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs font-bold">
            <button
              id="temp-unit-c-btn"
              onClick={() => setUnit('C')}
              className={`px-3 py-1 rounded-lg transition-all ${
                unit === 'C'
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              id="temp-unit-f-btn"
              onClick={() => setUnit('F')}
              className={`px-3 py-1 rounded-lg transition-all ${
                unit === 'F'
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              °F
            </button>
          </div>

          {/* Refresh Simulation */}
          <button
            id="weather-refresh-btn"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all border border-slate-200 dark:border-slate-600 disabled:opacity-60"
            title="Simulate refreshing meteorological feeds"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Updating...' : 'Update Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Featured Banner: Selected / Arrival Day Highlights */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-teal-50 to-indigo-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800/80 border border-sky-100 dark:border-slate-700 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Main Temp & Condition */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-700/80 shadow-xs border border-sky-100 dark:border-slate-600 flex items-center justify-center shrink-0">
              {renderWeatherIcon(activeForecastDay.icon, 'w-9 h-9')}
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>{activeForecastDay.dayName}</span>
                <span>•</span>
                <span>{activeForecastDay.formattedDate}</span>
                <span>•</span>
                <span className="font-bold text-teal-700 dark:text-teal-300">
                  Day {activeForecastDay.dayNumber} of Itinerary
                </span>
              </div>

              <div className="flex items-baseline gap-3 mt-0.5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {unit === 'C' ? `${activeForecastDay.tempMaxC}°C` : `${activeForecastDay.tempMaxF}°F`}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
                  {activeForecastDay.condition}
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  (Low: {unit === 'C' ? `${activeForecastDay.tempMinC}°C` : `${activeForecastDay.tempMinF}°F`})
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                {activeForecastDay.activityRecommendation}
              </p>
            </div>
          </div>

          {/* Micro Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-xl border border-sky-100/60 dark:border-slate-700/60 shrink-0">
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-sky-500" />
                Rain Risk
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {activeForecastDay.precipitationChance}%
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Wind className="w-3 h-3 text-teal-500" />
                Wind Speed
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {activeForecastDay.windSpeedKmH} km/h
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-500" />
                UV Index
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {activeForecastDay.uvIndex} of 10
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Air Quality
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {weather.airQualityStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Travel & Packing Advice Line */}
        <div className="mt-4 pt-3.5 border-t border-sky-100 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Umbrella className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>
              <strong>Packing & Attire: </strong>
              {activeForecastDay.clothingTip}
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            Telemetry updated: {lastRefreshed}
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>5-Day Outlook (Click day to inspect & link itinerary)</span>
          </h4>
          <span className="text-[11px] text-slate-400 font-medium">
            High / Low Range
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {weather.forecastDays.map((day) => {
            const isSelected = selectedDayNum === day.dayNumber;
            const highTemp = unit === 'C' ? `${day.tempMaxC}°` : `${day.tempMaxF}°`;
            const lowTemp = unit === 'C' ? `${day.tempMinC}°` : `${day.tempMinF}°`;

            return (
              <button
                key={day.dayNumber}
                id={`weather-day-card-${day.dayNumber}`}
                type="button"
                onClick={() => onSelectDay?.(day.dayNumber)}
                className={`text-left p-4 rounded-2xl border transition-all relative flex flex-col justify-between gap-3 group cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-slate-50/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-teal-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                {/* Header: Day number + Date */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                      Day {day.dayNumber}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase border ${getSuitabilityColor(
                        day.travelSuitability
                      )}`}
                    >
                      {day.travelSuitability === 'Ideal for Outdoors' ? 'Outdoors' : day.travelSuitability}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {day.formattedDate.split(',')[0]} • {day.date.split('-').slice(1).join('/')}
                  </div>
                </div>

                {/* Weather icon + Temp */}
                <div className="flex items-center justify-between py-1">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700/60 shadow-2xs border border-slate-200 dark:border-slate-600 flex items-center justify-center">
                    {renderWeatherIcon(day.icon, 'w-6 h-6')}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                      {highTemp}
                    </div>
                    <div className="text-xs text-slate-400 font-semibold">
                      {lowTemp}
                    </div>
                  </div>
                </div>

                {/* Condition string & Rain chance */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 truncate text-[11px]" title={day.condition}>
                    {day.condition}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-sky-500" />
                      <span>{day.precipitationChance}% rain</span>
                    </span>
                    <span className="flex items-center gap-0.5 text-slate-400">
                      <Wind className="w-3 h-3" />
                      <span>{day.windSpeedKmH}k</span>
                    </span>
                  </div>
                </div>

                {/* Selected Day Pill */}
                {isSelected && (
                  <div className="text-[10px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 justify-center pt-1 border-t border-teal-200 dark:border-teal-800">
                    <CheckCircle2 className="w-3 h-3 text-teal-500" />
                    <span>Viewing Day {day.dayNumber}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable Hourly Radar Breakdown */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
        <button
          id="toggle-hourly-forecast-btn"
          onClick={() => setShowHourly(!showHourly)}
          className="flex items-center justify-between w-full p-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {showHourly ? 'Hide' : 'View'} Hourly Microclimate Timeline for Day {activeForecastDay.dayNumber} ({activeForecastDay.dayName})
            </span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400">
            <span>{showHourly ? 'Collapse' : 'Expand 4-Period Timeline'}</span>
            {showHourly ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {showHourly && (
          <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeForecastDay.hourlySlots.map((slot, sIdx) => {
                const tempFormatted = unit === 'C' ? `${slot.tempC}°C` : `${slot.tempF}°F`;
                return (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1.5"
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {slot.period} ({slot.time})
                    </div>
                    <div className="flex justify-center py-1">
                      {renderWeatherIcon(slot.icon, 'w-6 h-6')}
                    </div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      {tempFormatted}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                      {slot.condition}
                    </div>
                    <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                      💧 {slot.pop}% precip
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Architecture Note */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Simulated Weather Intelligence Preview:</strong> This preview showcases how real-time microclimate sensors and future meteorological APIs (e.g. OpenWeather or WeatherAPI) connect into each day of the journey. In production, this can seamlessly bind to live GPS or destination coordinates.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
