import React from 'react';
import { Competitor } from '../../types';

interface OverviewViewProps {
  competitors: Competitor[];
  onNavigateToCompetitors: () => void;
  onOpenNewPost: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  competitors,
  onNavigateToCompetitors,
  onOpenNewPost,
}) => {
  const userBrand = competitors.find(c => c.isUserBrand) || competitors[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome & KPI Summary Deck */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
            Acme Media Co. Analytics Hub
          </h1>
          <p className="text-[13px] text-outline mt-0.5">
            Aggregated cross-platform metrics, audience expansion &amp; competitive standing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToCompetitors}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[13px] font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
            <span>View Competitor Suite</span>
          </button>
          <button
            onClick={onOpenNewPost}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-[13px] font-semibold transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Compose Post</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[12px] font-semibold uppercase tracking-wider">
            <span>Total Reach</span>
            <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
          </div>
          <div className="mt-3">
            <span className="font-headline text-2xl lg:text-3xl font-extrabold text-on-surface font-mono tabular-nums">
              842,410
            </span>
            <div className="flex items-center gap-1 text-secondary text-[12px] font-semibold mt-1">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>+5.4% (+43.2k this month)</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[12px] font-semibold uppercase tracking-wider">
            <span>Avg. Engagement</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">monitoring</span>
          </div>
          <div className="mt-3">
            <span className="font-headline text-2xl lg:text-3xl font-extrabold text-on-surface font-mono tabular-nums">
              4.82%
            </span>
            <div className="flex items-center gap-1 text-secondary text-[12px] font-semibold mt-1">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>+1.3% above 3.5% benchmark</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[12px] font-semibold uppercase tracking-wider">
            <span>Share of Voice</span>
            <span className="material-symbols-outlined text-tertiary text-[20px]">pie_chart</span>
          </div>
          <div className="mt-3">
            <span className="font-headline text-2xl lg:text-3xl font-extrabold text-on-surface font-mono tabular-nums">
              38.0%
            </span>
            <div className="flex items-center gap-1 text-primary text-[12px] font-semibold mt-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>#1 Leader in Segment (+4.8% pt)</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[12px] font-semibold uppercase tracking-wider">
            <span>Positive Sentiment</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">sentiment_very_satisfied</span>
          </div>
          <div className="mt-3">
            <span className="font-headline text-2xl lg:text-3xl font-extrabold text-on-surface font-mono tabular-nums">
              94.0%
            </span>
            <div className="flex items-center gap-1 text-secondary text-[12px] font-semibold mt-1">
              <span>Exceptional Brand Trust Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Channel Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-headline text-[16px] font-bold text-on-surface">Channel Distribution &amp; Strength</h2>
              <p className="text-[12px] text-outline">Followers and engagement split across active channels</p>
            </div>
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider font-mono">Live Sync</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(userBrand.platformBreakdown).map(([platform, stats]) => (
              <div key={platform} className="p-3.5 rounded-xl bg-surface-container-low border border-[#eaedff]/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold capitalize text-primary text-[12px] font-mono shadow-2xs">
                    {platform.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-on-surface capitalize">{platform}</span>
                    <span className="text-[11px] text-outline">{stats.postsCount} posts in 30d</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-on-surface font-mono tabular-nums block">
                    {stats.followers.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-secondary font-semibold font-mono tabular-nums">
                    {stats.engagementRate}% eng
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Competitive Alerts */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-headline text-[16px] font-bold text-on-surface">Competitor Radar</h2>
              <button
                onClick={onNavigateToCompetitors}
                className="text-[12px] font-semibold text-primary hover:underline cursor-pointer"
              >
                Full Leaderboard →
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {competitors.slice(0, 3).map((comp, idx) => (
                <div
                  key={comp.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-[#eaedff]/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface-container text-on-surface text-[11px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[13px] font-semibold text-on-surface">{comp.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-mono font-bold text-on-surface tabular-nums">
                      {comp.followers.toLocaleString()}
                    </span>
                    <span className={`text-[10px] block font-semibold ${comp.followerGrowthRate >= 0 ? 'text-secondary' : 'text-error'}`}>
                      {comp.followerGrowthRate >= 0 ? '+' : ''}{comp.followerGrowthRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-primary-fixed/40 border border-primary/10 mt-4 text-[12px] text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
            <span>You lead AlphaBrand by <strong>56.2k</strong> net followers.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
