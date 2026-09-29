import React from 'react';
import { Platform, Timeframe } from '../types';

interface HeaderProps {
  activePlatform: Platform;
  onChangePlatform: (platform: Platform) => void;
  activeTimeframe: Timeframe;
  onChangeTimeframe: (timeframe: Timeframe) => void;
  onOpenNewPost: () => void;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePlatform,
  onChangePlatform,
  activeTimeframe,
  onChangeTimeframe,
  onOpenNewPost,
  onOpenCommandPalette,
  onOpenNotifications,
  unreadNotificationsCount,
}) => {
  const platforms: { id: Platform; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'x', label: 'X' },
    { id: 'youtube', label: 'YouTube' },
  ];

  const timeframeLabels: Record<Timeframe, string> = {
    '30d': 'Last 30 Days',
    'q2': 'Q2 2024',
    '6m': '6 Months',
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        {/* Search trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="relative flex items-center w-full max-w-xs text-left cursor-pointer group"
          title="Search (⌘K)"
        >
          <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] group-hover:text-primary transition-colors">
            search
          </span>
          <div className="w-full pl-9 pr-14 py-1.5 rounded-lg bg-surface-container-low text-outline text-[13px] border border-transparent group-hover:border-primary/20 transition-all flex items-center">
            Search analytics, channels, competitors...
          </div>
          <div className="absolute right-2 px-1.5 py-0.5 rounded bg-surface-container-highest text-outline text-[11px] font-mono font-medium">
            ⌘K
          </div>
        </button>

        {/* Timeframe Quick Switcher */}
        <div className="relative">
          <select
            value={activeTimeframe}
            onChange={(e) => onChangeTimeframe(e.target.value as Timeframe)}
            className="appearance-none flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 pr-8 rounded-lg text-on-surface text-[13px] font-medium border border-transparent hover:bg-surface-container-high transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="30d">Last 30 Days</option>
            <option value="q2">Q2 2024</option>
            <option value="6m">6 Months</option>
          </select>
          <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 top-2 pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Platform Channel Segmented Pills */}
        <div className="hidden xl:flex items-center gap-0.5 bg-surface-container-low p-1 rounded-lg border border-[#eaedff]">
          {platforms.map((p) => {
            const isSelected = activePlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChangePlatform(p.id)}
                type="button"
                className={`px-2.5 py-1 rounded text-[12px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-surface-container-lowest shadow-sm text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Action Deck */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenNewPost}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all text-[13px] font-semibold shadow-sm cursor-pointer active:scale-[0.98]"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Post</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
            type="button"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
            )}
          </button>
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
            type="button"
            title="Help & Shortcuts"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
        </div>

        <img
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high shrink-0 ml-1"
          src="https://lh3.googleusercontent.com/aida/AEtjO1XX3x3xSCI9lJ3nEnYN6S8SIAukqHjAaloltWH61BuJweg0VEEFIQ_rfgooZ3EIQM3WBxtRX6twrR0gwHE--uID1huUAdXd6VZzRV1RKBnt775MRC6fDWoSQh4UXwEjd6T9lEJ5xgId5OAh1gTdQUGCdnC4rttVMWM8-3yNaV3obO7emtpQUUDrwUJtDUwmxGLo-Ji5OkrTiEPJ6VJLUbPEJk_-6dPHjHr7IhHLot4CiTFAF7vaVpGp4wI"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    </header>
  );
};
