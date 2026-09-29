import React from 'react';

export const EngagementView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
          Engagement Velocity &amp; Format Yield
        </h1>
        <p className="text-[13px] text-outline mt-0.5">
          Algorithmic breakdown of engagement rates by format, publishing hours, and bookmark multipliers
        </p>
      </div>

      {/* Format Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { format: 'Multi-Slide Carousels', eng: '5.84%', uplift: '+41% bookmark saves', icon: 'view_carousel', color: 'text-primary' },
          { format: 'Short Video / Reels', eng: '4.62%', uplift: '+65% viral reach', icon: 'play_circle', color: 'text-tertiary' },
          { format: 'Single Image Posts', eng: '3.15%', uplift: 'Standard baseline', icon: 'image', color: 'text-outline' },
          { format: 'Text & Insight Threads', eng: '4.10%', uplift: '+28% comment depth', icon: 'notes', color: 'text-secondary' },
        ].map((item) => (
          <div key={item.format} className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className={`material-symbols-outlined text-[24px] ${item.color}`}>{item.icon}</span>
              <span className="text-[11px] font-semibold text-outline uppercase font-mono">Format Yield</span>
            </div>
            <div className="mt-3">
              <span className="font-headline text-2xl font-bold text-on-surface font-mono tabular-nums">
                {item.eng}
              </span>
              <span className="text-[12px] font-semibold text-on-surface block mt-0.5">{item.format}</span>
              <span className="text-[11px] text-secondary font-medium block mt-1">{item.uplift}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Timing Heatmap */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-headline text-[16px] font-bold text-on-surface">Optimal Publishing Hourly Heatmap</h2>
            <p className="text-[12px] text-outline">Engagement index by hour of the day (EST timezone)</p>
          </div>
          <span className="text-[11px] font-bold text-primary px-2.5 py-1 rounded-full bg-primary-fixed">
            Peak: 11:00 AM - 12:30 PM EST
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 text-center">
          {[
            { hour: '7 AM', score: 25 },
            { hour: '8 AM', score: 45 },
            { hour: '9 AM', score: 65 },
            { hour: '10 AM', score: 85 },
            { hour: '11 AM', score: 100, peak: true },
            { hour: '12 PM', score: 92 },
            { hour: '1 PM', score: 70 },
            { hour: '2 PM', score: 55 },
            { hour: '3 PM', score: 60 },
            { hour: '4 PM', score: 50 },
            { hour: '5 PM', score: 40 },
            { hour: '6 PM', score: 30 },
          ].map((slot) => (
            <div
              key={slot.hour}
              className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                slot.peak
                  ? 'bg-primary text-white shadow-sm ring-2 ring-primary/40'
                  : slot.score >= 80
                  ? 'bg-surface-container-highest text-on-surface'
                  : 'bg-surface-container-low text-outline'
              }`}
            >
              <span className="text-[11px] font-mono font-semibold">{slot.hour}</span>
              <span className="text-[13px] font-bold font-mono mt-1">{slot.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
