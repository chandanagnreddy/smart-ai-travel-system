import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Compass,
  MessageSquare,
  GraduationCap,
  HelpCircle,
  Loader2,
  MapPin,
  Globe,
  ExternalLink,
  Search,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { TripPlan, ChatMessage, GroundedPlace, GroundingSource } from '../types';

interface AITravelAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrip: TripPlan;
}

export type GroundingMode = 'auto' | 'googleSearch' | 'googleMaps';

export const AITravelAssistantDrawer: React.FC<AITravelAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeTrip,
}) => {
  const [groundingMode, setGroundingMode] = useState<GroundingMode>('auto');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello! I'm your AI Travel Assistant for **${activeTrip.formData.destination}**.\n\nNow enhanced with **Google Search** and **Google Maps** data grounding via **gemini-3.5-flash**! You can ask for real-time web advice or discover verified places with direct Google Maps navigation.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      groundingType: 'none',
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '📍 Top Cafes & Eats (Google Maps)', text: `Recommend the best rated cafes and local food spots in ${activeTrip.formData.destination} on Google Maps`, mode: 'googleMaps' as GroundingMode },
    { label: '📍 Top Sights & Viewpoints (Google Maps)', text: `What are the must-see viewpoints and landmarks in ${activeTrip.formData.destination}?`, mode: 'googleMaps' as GroundingMode },
    { label: '🌐 Transit Passes & Rules (Google Search)', text: `What are the current transit passes, entry guidelines, and budget discounts for ${activeTrip.formData.destination}?`, mode: 'googleSearch' as GroundingMode },
    { label: '🌐 Weather & Packing (Google Search)', text: `What is the up-to-date weather and seasonal packing advice for ${activeTrip.formData.destination}?`, mode: 'googleSearch' as GroundingMode },
    { label: '💰 Student Budget Hacks', text: `How can a student travel cheaply in ${activeTrip.formData.destination}?`, mode: 'auto' as GroundingMode },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string, overrideMode?: GroundingMode) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const activeMode = overrideMode || groundingMode;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          destination: activeTrip.formData.destination,
          requestedGrounding: activeMode,
          tripContext: {
            days: activeTrip.formData.days,
            budget: activeTrip.budget.userBudget,
            travelType: activeTrip.formData.travelType,
            interests: activeTrip.formData.interests,
            studentMode: activeTrip.formData.studentMode,
            preferredTransport: activeTrip.formData.preferredTransport,
            foodPref: activeTrip.formData.foodPref,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I've noted that! Let me know if you need further details about your trip.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
        groundingType: data.groundingType || 'none',
        groundedPlaces: data.groundedPlaces,
        groundingSources: data.groundingSources,
        searchQueries: data.searchQueries,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat Assistant error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Here is travel advice for ${activeTrip.formData.destination}: Use regional day transit passes, carry a small cash buffer for traditional markets, and book popular museum tickets in advance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingType: 'none',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      id="ai-travel-assistant-drawer"
      aria-label="AI Travel Assistant"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] md:w-[500px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-white animate-in slide-in-from-right duration-300"
    >
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white">AI Travel Assistant</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                gemini-3.5-flash
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {activeTrip.formData.destination} • Google Search & Maps Grounded
            </p>
          </div>
        </div>

        <button
          id="close-assistant-drawer-btn"
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close Assistant"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Grounding Mode Toggle Bar */}
      <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <span className="text-slate-400 font-semibold text-[11px] shrink-0">Grounding Source:</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            id="grounding-mode-auto-btn"
            onClick={() => setGroundingMode('auto')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              groundingMode === 'auto'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Auto
          </button>
          <button
            type="button"
            id="grounding-mode-search-btn"
            onClick={() => setGroundingMode('googleSearch')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              groundingMode === 'googleSearch'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Search Data</span>
          </button>
          <button
            type="button"
            id="grounding-mode-maps-btn"
            onClick={() => setGroundingMode('googleMaps')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              groundingMode === 'googleMaps'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <MapPin className="w-3 h-3" />
            <span>Maps Data</span>
          </button>
        </div>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-7 h-7 rounded-lg bg-teal-600/30 border border-teal-500/40 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                </div>
              )}
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed space-y-3 ${
                  isAi
                    ? 'bg-slate-800/90 text-slate-200 border border-slate-700/80 shadow-xs'
                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium shadow-xs'
                }`}
              >
                {/* Grounding Source Badge */}
                {isAi && msg.groundingType && msg.groundingType !== 'none' && (
                  <div className="flex items-center gap-1.5 pb-1 border-b border-slate-700/60">
                    {msg.groundingType === 'googleMaps' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/80">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>Google Maps Grounded • gemini-3.5-flash</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/80">
                        <Globe className="w-3 h-3 text-cyan-400" />
                        <span>Google Search Grounded • gemini-3.5-flash</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Google Maps Grounded Places Display */}
                {msg.groundedPlaces && msg.groundedPlaces.length > 0 && (
                  <div className="pt-2 border-t border-slate-700/70 space-y-2">
                    <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>Verified Google Maps Locations:</span>
                    </div>
                    <div className="space-y-2">
                      {msg.groundedPlaces.map((place, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs space-y-1.5 hover:border-emerald-500/60 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-extrabold text-white text-xs flex items-center gap-1">
                              <span>📍</span>
                              <span>{place.title}</span>
                            </span>
                            <a
                              href={place.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 transition-all"
                            >
                              <span>Open in Maps</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          {place.address && (
                            <div className="text-[11px] text-slate-400">
                              {place.address}
                            </div>
                          )}

                          {place.reviewSnippet && (
                            <div className="text-[11px] text-emerald-300/90 italic bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-800/40">
                              {place.reviewSnippet}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Google Search Grounding Web Sources Display */}
                {msg.groundingSources && msg.groundingSources.length > 0 && (
                  <div className="pt-2 border-t border-slate-700/70 space-y-2">
                    <div className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Verified Search Sources:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.groundingSources.map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60 text-[11px] font-medium transition-all"
                        >
                          <span>{source.title}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                <div
                  className={`text-[10px] ${
                    isAi ? 'text-slate-500' : 'text-teal-200 text-right'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-lg bg-teal-600/30 border border-teal-500/40 flex items-center justify-center shrink-0 mt-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-spin" />
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 text-xs text-slate-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
              <span>
                {groundingMode === 'googleMaps'
                  ? 'Grounded via Google Maps (gemini-3.5-flash)...'
                  : groundingMode === 'googleSearch'
                  ? 'Grounded via Google Search (gemini-3.5-flash)...'
                  : 'Retrieving up-to-date travel data (gemini-3.5-flash)...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-teal-400" />
          <span>Grounded Suggestions</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt.text, prompt.mode)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-teal-300 border border-slate-700/80 whitespace-nowrap transition-colors"
            >
              {prompt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={
              groundingMode === 'googleMaps'
                ? `Search places in ${activeTrip.formData.destination} (Google Maps)...`
                : groundingMode === 'googleSearch'
                ? `Ask current travel info for ${activeTrip.formData.destination} (Google Search)...`
                : `Ask about ${activeTrip.formData.destination}...`
            }
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-800 border border-slate-700 text-white placeholder-slate-400 outline-hidden focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-md shadow-teal-600/20"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  );
};
