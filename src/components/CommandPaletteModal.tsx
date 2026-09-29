import React, { useState, useEffect } from 'react';
import { Competitor, NavTab } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitors: Competitor[];
  onSelectCompetitor: (competitor: Competitor) => void;
  onSelectTab: (tab: NavTab) => void;
  onOpenNewPost: () => void;
  onOpenAddCompetitor: () => void;
  onExportCSV: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  competitors,
  onSelectCompetitor,
  onSelectTab,
  onOpenNewPost,
  onOpenAddCompetitor,
  onExportCSV,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCompetitors = competitors.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.handle.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const views: { id: NavTab; label: string; icon: string }[] = [
    { id: 'competitor-analysis', label: 'Competitor Benchmark Suite', icon: 'compare_arrows' },
    { id: 'overview', label: 'Executive Overview', icon: 'grid_view' },
    { id: 'audience-insights', label: 'Audience Insights & Demographics', icon: 'group' },
    { id: 'engagement', label: 'Engagement Analytics & Formats', icon: 'monitoring' },
    { id: 'content-planner', label: 'Content Planner & Calendar', icon: 'calendar_today' },
    { id: 'reports', label: 'Reports & Export Digest', icon: 'description' },
    { id: 'settings', label: 'Settings & Workspace Limits', icon: 'settings' },
  ];

  const filteredViews = views.filter(v =>
    v.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full shadow-2xl border border-[#eaedff] overflow-hidden flex flex-col">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#eaedff]">
          <span className="material-symbols-outlined text-outline text-[22px]">search</span>
          <input
            autoFocus
            type="text"
            placeholder="Type a command, search competitors, or navigate..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-on-surface outline-none placeholder:text-outline"
          />
          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-outline">
            ESC to close
          </span>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2 flex flex-col gap-3">
          {/* Quick Actions */}
          <div>
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider px-2 py-1 block">
              Quick Actions
            </span>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenNewPost();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[13px] text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">add_circle</span>
                <span className="font-medium">Create New Social Post</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenAddCompetitor();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[13px] text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">person_add</span>
                <span className="font-medium">Track New Competitor</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onExportCSV();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[13px] text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">file_download</span>
                <span className="font-medium">Export Benchmark CSV</span>
              </button>
            </div>
          </div>

          {/* Competitors */}
          {filteredCompetitors.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider px-2 py-1 block">
                Tracked Brands &amp; Creators ({filteredCompetitors.length})
              </span>
              <div className="flex flex-col gap-0.5">
                {filteredCompetitors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onClose();
                      onSelectCompetitor(c);
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-outline text-[18px]">analytics</span>
                      <span className="text-[13px] font-medium text-on-surface">{c.name}</span>
                      <span className="text-[11px] text-outline">{c.handle}</span>
                    </div>
                    <span className="text-[12px] font-mono font-bold text-on-surface tabular-nums">
                      {c.followers.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Views */}
          {filteredViews.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider px-2 py-1 block">
                Navigation
              </span>
              <div className="flex flex-col gap-0.5">
                {filteredViews.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onClose();
                      onSelectTab(v.id);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[13px] text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-outline text-[18px]">{v.icon}</span>
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
