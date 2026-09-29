import React, { useState } from 'react';
import { Competitor, Platform } from '../types';

interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCompetitor: (newComp: Competitor) => void;
}

export const AddCompetitorModal: React.FC<AddCompetitorModalProps> = ({
  isOpen,
  onClose,
  onAddCompetitor,
}) => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [category, setCategory] = useState('Developer Tools');
  const [primaryPlatform, setPrimaryPlatform] = useState<Exclude<Platform, 'all'>>('linkedin');
  const [followersCount, setFollowersCount] = useState('520000');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState(0);

  if (!isOpen) return null;

  const handleSuggest = (preset: { name: string; handle: string; category: string; platform: Exclude<Platform, 'all'>; followers: string }) => {
    setName(preset.name);
    setHandle(preset.handle);
    setCategory(preset.category);
    setPrimaryPlatform(preset.platform);
    setFollowersCount(preset.followers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !handle.trim()) return;

    setIsCrawling(true);
    setCrawlProgress(25);

    setTimeout(() => setCrawlProgress(60), 300);
    setTimeout(() => setCrawlProgress(90), 650);

    setTimeout(() => {
      const followersNum = parseInt(followersCount, 10) || 350000;
      const newCompetitor: Competitor = {
        id: `comp-${Date.now()}`,
        name: name.trim(),
        handle: handle.startsWith('@') ? handle.trim() : `@${handle.trim()}`,
        category,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`,
        isUserBrand: false,
        tag: 'New Tracker',
        tagColor: 'bg-primary-fixed text-on-primary-fixed-variant',
        followers: followersNum,
        followerGrowthRate: +(Math.random() * 5 + 1).toFixed(1),
        followerGrowthCount: Math.round(followersNum * 0.035),
        engagementRate: +(Math.random() * 2 + 2.5).toFixed(2),
        benchmarkDelta: '+0.2% vs avg',
        benchmarkSubtext: `${category} average`,
        postCadence30d: Math.floor(Math.random() * 12) + 10,
        postCadenceWeekly: +(Math.random() * 2 + 2).toFixed(1),
        sentimentScore: Math.floor(Math.random() * 15) + 80,
        sentimentLabel: '85% Positive',
        sentimentRating: 'Favorable',
        shareOfVoice: 12,
        color: '#6063ee',
        trajectory: {
          '30d': [
            Math.round(followersNum * 0.94),
            Math.round(followersNum * 0.955),
            Math.round(followersNum * 0.97),
            Math.round(followersNum * 0.98),
            Math.round(followersNum * 0.99),
            followersNum,
          ],
          'q2': [
            Math.round(followersNum * 0.88),
            Math.round(followersNum * 0.91),
            Math.round(followersNum * 0.93),
            Math.round(followersNum * 0.95),
            Math.round(followersNum * 0.98),
            followersNum,
          ],
          '6m': [
            Math.round(followersNum * 0.8),
            Math.round(followersNum * 0.84),
            Math.round(followersNum * 0.89),
            Math.round(followersNum * 0.93),
            Math.round(followersNum * 0.97),
            followersNum,
          ],
        },
        platformBreakdown: {
          instagram: { followers: Math.round(followersNum * 0.3), engagementRate: 3.5, postsCount: 4 },
          tiktok: { followers: Math.round(followersNum * 0.2), engagementRate: 4.8, postsCount: 3 },
          linkedin: { followers: Math.round(followersNum * 0.35), engagementRate: 4.2, postsCount: 5 },
          x: { followers: Math.round(followersNum * 0.1), engagementRate: 2.9, postsCount: 2 },
          youtube: { followers: Math.round(followersNum * 0.05), engagementRate: 3.8, postsCount: 1 },
        },
        topPosts: [
          {
            id: `p-${Date.now()}`,
            title: `${name} core product deep dive & developer adoption metrics`,
            platform: primaryPlatform,
            type: 'carousel',
            likes: 4200,
            comments: 180,
            shares: 390,
            engagementRate: 4.5,
            postedAt: '3 days ago',
            summary: 'Community release teardown exploring speed and latency improvements.'
          }
        ],
        strengths: ['Active organic discussions', 'Growing technical advocacy'],
        weaknesses: ['Irregular video format publishing', 'Inconsistent weekend engagement']
      };

      onAddCompetitor(newCompetitor);
      setIsCrawling(false);
      onClose();
      // reset
      setName('');
      setHandle('');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-6 shadow-xl border border-[#eaedff]">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">person_add</span>
            <h2 className="font-headline text-lg font-bold text-on-surface">Track New Competitor</h2>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isCrawling ? (
          <div className="py-8 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <div className="flex flex-col gap-1">
              <span className="font-headline text-[15px] font-bold text-on-surface">
                Crawling Public Metrics for {handle || name}...
              </span>
              <span className="text-[12px] text-outline">
                Indexing follower delta, sentiment curves, and 30-day post cadence
              </span>
            </div>
            <div className="w-48 bg-surface-container h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${crawlProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            {/* Quick Suggestions */}
            <div>
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1.5">
                Suggested SaaS Benchmarks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Linear', handle: '@linear', category: 'Project Tooling', platform: 'x' as const, followers: '480000' },
                  { name: 'Supabase', handle: '@supabase', category: 'Backend Cloud', platform: 'x' as const, followers: '620000' },
                  { name: 'Vercel', handle: '@vercel', category: 'Cloud Infrastructure', platform: 'linkedin' as const, followers: '890000' },
                  { name: 'Raycast', handle: '@raycast', category: 'Productivity OS', platform: 'x' as const, followers: '340000' },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSuggest(preset)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors cursor-pointer border border-[#eaedff]"
                  >
                    + {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">
                  Brand / Creator Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Supabase"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">
                  Social Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="@handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">
                  Category / Segment
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-on-surface outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="Enterprise SaaS">Enterprise SaaS</option>
                  <option value="Product Led">Product Led</option>
                  <option value="Developer Tools">Developer Tools</option>
                  <option value="Growth Agency">Growth Agency</option>
                  <option value="B2B Media">B2B Media</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">
                  Primary Channel
                </label>
                <select
                  value={primaryPlatform}
                  onChange={(e) => setPrimaryPlatform(e.target.value as Exclude<Platform, 'all'>)}
                  className="w-full px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-on-surface outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="x">X / Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">
                Estimated Total Audience Size
              </label>
              <input
                type="number"
                value={followersCount}
                onChange={(e) => setFollowersCount(e.target.value)}
                className="w-full px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-on-surface outline-none focus:ring-2 focus:ring-primary/20 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eaedff]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] font-medium text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-[13px] font-semibold text-white bg-primary hover:bg-primary-container rounded-lg transition-all shadow-sm cursor-pointer"
              >
                Start Tracking &amp; Sync
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
