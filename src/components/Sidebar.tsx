import React from 'react';
import { NavTab } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  trackedCount: number;
  maxTrackedCount: number;
  onOpenUpgrade?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  trackedCount,
  maxTrackedCount,
  onOpenUpgrade,
}) => {
  const navItems: { id: NavTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'grid_view' },
    { id: 'audience-insights', label: 'Audience Insights', icon: 'group' },
    { id: 'engagement', label: 'Engagement', icon: 'monitoring' },
    { id: 'competitor-analysis', label: 'Competitor Analysis', icon: 'compare_arrows' },
    { id: 'content-planner', label: 'Content Planner', icon: 'calendar_today' },
    { id: 'reports', label: 'Reports', icon: 'description' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const quotaPercent = Math.min(100, Math.round((trackedCount / maxTrackedCount) * 100));

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-[#eaedff]">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-[#eaedff]/60">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <span className="material-symbols-outlined text-[20px]">insights</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-[19px] text-on-surface tracking-tight font-extrabold leading-none">
              SocialMetrics
            </span>
            <span className="text-[11px] text-outline tracking-wider font-medium uppercase mt-0.5">
              Benchmark Suite
            </span>
          </div>
        </div>

        {/* Workspace Card */}
        <div className="px-4 py-3">
          <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5 border border-[#eaedff]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Workspace
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                Pro Plan
              </span>
            </div>
            <div className="flex items-center justify-between text-on-surface">
              <span className="text-[13px] font-semibold text-on-surface">Acme Media Co.</span>
              <span className="text-[12px] text-outline font-mono tabular-nums">
                {trackedCount}/{maxTrackedCount}
              </span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-0.5">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${quotaPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-outline pt-0.5">
              <span>Tracked brands</span>
              {quotaPercent >= 80 && (
                <button
                  onClick={onOpenUpgrade}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Upgrade slots
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 px-3 py-2 flex-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer text-[14px] ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? 'text-white' : 'text-outline'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.id === 'competitor-analysis' && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-secondary animate-pulse" title="Live sync active" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 bg-surface-container-lowest border-t border-[#eaedff]">
        <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              alt="Alex Rivera Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-container-high shrink-0"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XX3x3xSCI9lJ3nEnYN6S8SIAukqHjAaloltWH61BuJweg0VEEFIQ_rfgooZ3EIQM3WBxtRX6twrR0gwHE--uID1huUAdXd6VZzRV1RKBnt775MRC6fDWoSQh4UXwEjd6T9lEJ5xgId5OAh1gTdQUGCdnC4rttVMWM8-3yNaV3obO7emtpQUUDrwUJtDUwmxGLo-Ji5OkrTiEPJ6VJLUbPEJk_-6dPHjHr7IhHLot4CiTFAF7vaVpGp4wI"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-on-surface font-semibold leading-tight truncate">
                Alex Rivera
              </span>
              <span className="text-[11px] text-outline leading-tight truncate">
                Product Lead
              </span>
            </div>
          </div>
          <button
            type="button"
            className="text-outline hover:text-on-surface transition-colors p-1"
            title="Account options"
          >
            <span className="material-symbols-outlined text-[18px]">unfold_more</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
