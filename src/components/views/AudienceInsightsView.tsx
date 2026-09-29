import React from 'react';
import { Competitor } from '../../types';

interface AudienceInsightsViewProps {
  competitors: Competitor[];
}

export const AudienceInsightsView: React.FC<AudienceInsightsViewProps> = ({ competitors }) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
          Audience Insights &amp; Overlap
        </h1>
        <p className="text-[13px] text-outline mt-0.5">
          Audience overlap with tracked SaaS competitors, job seniority distribution, and regional reach
        </p>
      </div>

      {/* Audience Overlap Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-headline text-[16px] font-bold text-on-surface">Audience Overlap Matrix</h2>
                <p className="text-[12px] text-outline">Shared followers who actively engage with both Acme Media and competitors</p>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                High Net Worth Audience
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {[
                { name: 'AlphaBrand', overlapPercent: 42, sharedFollowers: '353,000', sharedNiche: 'B2B Founders & Product Managers', affinity: 'High' },
                { name: 'TrendFlow', overlapPercent: 28, sharedFollowers: '235,800', sharedNiche: 'Growth Marketers & Indie Hackers', affinity: 'Moderate' },
                { name: 'PulseMedia', overlapPercent: 19, sharedFollowers: '160,000', sharedNiche: 'Media Buyers & Content Creators', affinity: 'Low' },
              ].map((item) => (
                <div key={item.name} className="p-3.5 rounded-xl bg-surface-container-low border border-[#eaedff] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-on-surface">{item.name}</span>
                    <span className="text-[12px] font-mono font-bold text-primary tabular-nums">
                      {item.overlapPercent}% Shared Audience ({item.sharedFollowers})
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${item.overlapPercent}%` }} />
                  </div>
                  <span className="text-[11px] text-outline">Core crossover: {item.sharedNiche}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seniority Distribution */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="font-headline text-[16px] font-bold text-on-surface mb-1">Job Title &amp; Seniority</h2>
            <p className="text-[12px] text-outline mb-4">Self-identified professional roles of engaged audience</p>

            <div className="flex flex-col gap-3">
              {[
                { title: 'Founders / C-Suite', percent: 34, count: '286k' },
                { title: 'Staff / Senior Engineers', percent: 27, count: '227k' },
                { title: 'Product & Growth Leads', percent: 22, count: '185k' },
                { title: 'Venture Capital / Angels', percent: 11, count: '92k' },
                { title: 'Consultants & Agencies', percent: 6, count: '52k' },
              ].map((role) => (
                <div key={role.title} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-on-surface">{role.title}</span>
                    <span className="text-outline font-mono tabular-nums">{role.percent}% ({role.count})</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary-container h-full rounded-full" style={{ width: `${role.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-surface-container-low text-[12px] text-outline">
            Strong executive concentration (+14% higher than B2B media averages).
          </div>
        </div>
      </div>
    </div>
  );
};
