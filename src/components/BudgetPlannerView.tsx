import React, { useState } from 'react';
import {
  Wallet,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Building,
  Train,
  Utensils,
  Compass,
  ShoppingBag,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { TripPlan, BudgetBreakdown } from '../types';

interface BudgetPlannerViewProps {
  trip: TripPlan;
  onUpdateBudget: (updatedBudget: BudgetBreakdown) => void;
  onToggleStudentMode: () => void;
  onAskAIHowToSave: () => void;
}

export const BudgetPlannerView: React.FC<BudgetPlannerViewProps> = ({
  trip,
  onUpdateBudget,
  onToggleStudentMode,
  onAskAIHowToSave,
}) => {
  const budget = trip.budget;
  const currencySymbol =
    trip.formData.currency === 'EUR' ? '€' :
    trip.formData.currency === 'GBP' ? '£' :
    trip.formData.currency === 'INR' ? '₹' :
    trip.formData.currency === 'JPY' ? '¥' : '$';

  const percentConsumed = Math.min(
    150,
    Math.round((budget.totalEstimated / Math.max(1, budget.userBudget)) * 100)
  );

  const categories = [
    {
      id: 'transportation',
      name: 'Transportation',
      amount: budget.transportation,
      icon: Train,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      tip: 'Includes intercity transport + local daily metro passes',
    },
    {
      id: 'accommodation',
      name: 'Hotels / Accommodation',
      amount: budget.accommodation,
      icon: Building,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-500',
      tip: `${trip.formData.days} nights based on ${trip.formData.accommodationPref}`,
    },
    {
      id: 'food',
      name: 'Food & Dining',
      amount: budget.food,
      icon: Utensils,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      tip: 'Breakfast, lunch, dinner & market snacks',
    },
    {
      id: 'activities',
      name: 'Activities & Attractions',
      amount: budget.activities,
      icon: Compass,
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
      tip: 'Museum admissions, landmarks & guided tours',
    },
    {
      id: 'shopping',
      name: 'Shopping & Souvenirs',
      amount: budget.shopping,
      icon: ShoppingBag,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      tip: 'Gifts, local artisan products & personal purchases',
    },
    {
      id: 'emergency',
      name: 'Emergency Buffer',
      amount: budget.emergency,
      icon: ShieldAlert,
      color: 'bg-rose-500',
      textColor: 'text-rose-500',
      tip: 'Contingency fund for pharmacy, lost items or surge transit',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Card */}
      <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold">
              <Wallet className="w-3.5 h-3.5" />
              <span>Smart Travel Budget Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trip Budget & Expense Forecast
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Total estimated trip expenses for {trip.formData.destination} based on your {trip.formData.days}-day stay.
            </p>
          </div>

          <button
            id="budget-ask-ai-save-btn"
            onClick={onAskAIHowToSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all self-start md:self-center"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Ask AI: How to Reduce Budget?</span>
          </button>
        </div>

        {/* Budget Warning or Surplus Alert Banner */}
        <div className="mt-6">
          {budget.isOverBudget ? (
            <div
              id="budget-exceeded-warning-banner"
              className="p-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-rose-700 dark:text-rose-300">
                    Budget Warning: Estimated Expenses Exceed Your Budget
                  </h4>
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    Your estimated cost of {currencySymbol}{budget.totalEstimated.toLocaleString()} is {currencySymbol}{budget.overBudgetAmount.toLocaleString()} higher than your target budget ({currencySymbol}{budget.userBudget.toLocaleString()}).
                  </p>
                </div>
              </div>

              {!trip.formData.studentMode && (
                <button
                  id="activate-student-mode-savings-btn"
                  onClick={onToggleStudentMode}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Activate Student Mode (-35%)</span>
                </button>
              )}
            </div>
          ) : (
            <div
              id="budget-safe-banner"
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    Trip Budget on Track: {currencySymbol}{budget.remaining.toLocaleString()} Surplus Remaining
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Estimated costs are within your target budget of {currencySymbol}{budget.userBudget.toLocaleString()}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary KPI Visual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* User Target Budget */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Target User Budget
          </span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {currencySymbol}{budget.userBudget.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            Set for {trip.formData.travelers} traveler(s), {trip.formData.days} days
          </p>
        </div>

        {/* Total Estimated Cost */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Estimated Cost
          </span>
          <div
            className={`text-3xl font-black ${
              budget.isOverBudget ? 'text-rose-500' : 'text-teal-600 dark:text-teal-400'
            }`}
          >
            {currencySymbol}{budget.totalEstimated.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            {percentConsumed}% of allocated budget utilized
          </p>
        </div>

        {/* Remaining Surplus or Deficit */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {budget.isOverBudget ? 'Budget Deficit' : 'Remaining Surplus'}
          </span>
          <div
            className={`text-3xl font-black ${
              budget.isOverBudget ? 'text-rose-600' : 'text-emerald-500'
            }`}
          >
            {budget.isOverBudget ? '-' : '+'}{currencySymbol}{Math.abs(budget.remaining).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            {budget.isOverBudget
              ? 'Trim categories below or enable Student Mode'
              : 'Safe cushion for spontaneous experiences'}
          </p>
        </div>
      </div>

      {/* Visual Progress Bar Chart */}
      <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <span>Overall Budget Consumption</span>
            <span className={budget.isOverBudget ? 'text-rose-500 font-extrabold' : 'text-teal-600 font-extrabold'}>
              {percentConsumed}% ({currencySymbol}{budget.totalEstimated.toLocaleString()} / {currencySymbol}{budget.userBudget.toLocaleString()})
            </span>
          </div>

          {/* Stacked Visual Bar */}
          <div className="w-full h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
            {categories.map((cat) => {
              const catPercent = Math.max(1, (cat.amount / Math.max(1, budget.totalEstimated)) * 100);
              return (
                <div
                  key={cat.id}
                  style={{ width: `${catPercent}%` }}
                  className={`${cat.color} h-full transition-all`}
                  title={`${cat.name}: ${currencySymbol}${cat.amount} (${Math.round(catPercent)}%)`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Category Expense Breakdown */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Category Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const catPct = Math.round((cat.amount / Math.max(1, budget.totalEstimated)) * 100);
              return (
                <div
                  key={cat.id}
                  id={`budget-card-${cat.id}`}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs ${cat.textColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {currencySymbol}{cat.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: `${catPct}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{catPct}% of total</span>
                    <span className="truncate max-w-[140px] text-right">{cat.tip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Money-Saving Tips & Student Mode Benefits */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-3xl border border-amber-500/30 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {trip.formData.studentMode
                ? `Student Mode Active: Savings of approx. ${currencySymbol}${budget.studentSavings || 380}`
                : 'Pro Travel Savings Tips'}
            </h3>
          </div>
          {trip.formData.studentMode && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-slate-950">
              Discounts Applied
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {budget.savingTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5"
            >
              <span className="text-amber-500 font-bold">💡</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
