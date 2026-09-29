import React, { useState } from 'react';
import { Competitor } from '../../types';

interface SettingsViewProps {
  competitors: Competitor[];
  trackedCount: number;
  maxTrackedCount: number;
  onRemoveCompetitor?: (id: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  competitors,
  trackedCount,
  maxTrackedCount,
  onRemoveCompetitor,
}) => {
  const [syncFreq, setSyncFreq] = useState('15m');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    setToastMessage('Settings successfully saved and live sync refreshed.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <h1 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
          Workspace Settings &amp; Channel Integrations
        </h1>
        <p className="text-[13px] text-outline mt-0.5">
          Manage competitor tracking slots, live API sync frequency, and notification preferences
        </p>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-secondary-container text-on-secondary-container font-semibold text-[13px] flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Plan & Slot Usage */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-headline text-[16px] font-bold text-on-surface">Tracked Competitor Quota</h2>
            <p className="text-[12px] text-outline">You are currently using {trackedCount} of {maxTrackedCount} allocated tracking slots.</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[11px]">
            Pro Plan Active
          </span>
        </div>

        <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden my-3">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${(trackedCount / maxTrackedCount) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[12px] text-outline pt-1">
          <span>{maxTrackedCount - trackedCount} slots remaining in your workspace</span>
          <span className="font-medium text-primary">Need more? Scale to Enterprise (50 slots)</span>
        </div>
      </div>

      {/* Active Trackers Management */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs">
        <h2 className="font-headline text-[16px] font-bold text-on-surface mb-3">Currently Tracked Profiles</h2>
        <div className="divide-y divide-[#eaedff]">
          {competitors.map((c) => (
            <div key={c.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-8 h-8 rounded-lg object-contain bg-surface-container p-0.5"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(c.name)}`;
                  }}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-on-surface">{c.name}</span>
                    {c.isUserBrand && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed-variant">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-outline">{c.handle} · {c.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[13px] font-mono font-bold text-on-surface tabular-nums">
                  {c.followers.toLocaleString()}
                </span>
                {!c.isUserBrand && onRemoveCompetitor && (
                  <button
                    type="button"
                    onClick={() => onRemoveCompetitor(c.id)}
                    className="text-[11px] font-semibold text-error hover:bg-error-container/40 px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Integrations Status */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs">
        <h2 className="font-headline text-[16px] font-bold text-on-surface mb-1">Live Social Platform Connectors</h2>
        <p className="text-[12px] text-outline mb-4">Official API crawler health and OAuth tokens</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'LinkedIn Community API', status: 'Connected (Syncing)', ping: '12m ago', active: true },
            { name: 'X / Twitter API v2', status: 'Connected (Syncing)', ping: '8m ago', active: true },
            { name: 'Instagram Graph API', status: 'Connected (Syncing)', ping: '5m ago', active: true },
            { name: 'TikTok Marketing API', status: 'Connected (Syncing)', ping: '14m ago', active: true },
            { name: 'YouTube Data API v3', status: 'Connected (Syncing)', ping: '20m ago', active: true },
          ].map((api) => (
            <div key={api.name} className="p-3 rounded-xl bg-surface-container-low border border-[#eaedff] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-on-surface">{api.name}</span>
                <span className="text-[11px] text-outline">Last ping {api.ping}</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Frequency */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-[16px] font-bold text-on-surface">Data Ingestion Interval</h2>
          <p className="text-[12px] text-outline">How often our backend crawler fetches latest metrics from competitor profiles</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={syncFreq}
            onChange={(e) => setSyncFreq(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-[#eaedff] text-[13px] font-semibold text-on-surface outline-none cursor-pointer"
          >
            <option value="15m">Every 15 minutes (Real-Time)</option>
            <option value="1h">Every 1 hour</option>
            <option value="6h">Every 6 hours</option>
          </select>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white text-[13px] font-semibold transition-all shadow-sm cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
