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
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { TripPlan, ChatMessage } from '../types';

interface AITravelAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrip: TripPlan;
}

export const AITravelAssistantDrawer: React.FC<AITravelAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeTrip,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello! I'm your AI Travel Assistant for **${activeTrip.formData.destination}**. How can I help you? You can ask about packing tips, budget tricks, local phrases, transit directions, or hidden spots!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    `What to pack for ${activeTrip.formData.destination} in ${activeTrip.formData.travelDate || 'autumn'}?`,
    `What are the best street food spots in ${activeTrip.formData.destination}?`,
    `How to save money on food and metro as a student in ${activeTrip.formData.destination}?`,
    `What are the emergency numbers in ${activeTrip.formData.destination}?`,
    `What is the best way to travel from the airport to city center?`,
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

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
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat Assistant error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Here is local advice for ${activeTrip.formData.destination}: Remember to keep your metro card handy, carry small cash denominations for street stalls, and verify operating hours for museums on Mondays. (Note: network fallback used).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] md:w-[460px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-white animate-in slide-in-from-right duration-300"
    >
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white">AI Travel Assistant</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800">
                Gemini AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trip context: {activeTrip.formData.destination} ({activeTrip.formData.days} days)
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
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isAi
                    ? 'bg-slate-800/90 text-slate-200 border border-slate-700/80 shadow-xs'
                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium shadow-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 ${
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
              <span>Analyzing destination advice & routes...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-teal-400" />
          <span>Suggested Questions</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-teal-300 border border-slate-700/80 whitespace-nowrap transition-colors"
            >
              {prompt}
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
            placeholder={`Ask about ${activeTrip.formData.destination}...`}
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
