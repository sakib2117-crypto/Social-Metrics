import React, { useState, useMemo } from 'react';
import { Competitor, Platform, Timeframe, StrategicOpportunity } from '../../types';

interface CompetitorBenchmarkViewProps {
  competitors: Competitor[];
  activePlatform: Platform;
  activeTimeframe: Timeframe;
  onChangeTimeframe: (tf: Timeframe) => void;
  opportunities: StrategicOpportunity[];
  onToggleOpportunity: (id: string) => void;
  onOpenAddCompetitor: () => void;
  onOpenDetailModal: (competitor: Competitor) => void;
  onOpenCarouselSprint: () => void;
  onOpenPlaybook: () => void;
  onExportCSV: () => void;
}

export const CompetitorBenchmarkView: React.FC<CompetitorBenchmarkViewProps> = ({
  competitors,
  activePlatform,
  activeTimeframe,
  onChangeTimeframe,
  opportunities,
  onToggleOpportunity,
  onOpenAddCompetitor,
  onOpenDetailModal,
  onOpenCarouselSprint,
  onOpenPlaybook,
  onExportCSV,
}) => {
  const [sortBy, setSortBy] = useState<'followers' | 'engagement' | 'sentiment' | 'cadence'>('followers');
  const [tableSearch, setTableSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTimeAgo, setSyncTimeAgo] = useState('8m ago');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncTimeAgo('Just now');
      setToastMessage('Live social benchmark metrics updated successfully.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 700);
  };

  // Adjust metrics based on activePlatform if selected
  const displayedCompetitors = useMemo(() => {
    return competitors.map(c => {
      if (activePlatform === 'all') {
        return c;
      }
      const platformData = c.platformBreakdown[activePlatform];
      if (!platformData) return c;
      return {
        ...c,
        followers: platformData.followers,
        engagementRate: platformData.engagementRate,
        postCadence30d: platformData.postsCount,
        postCadenceWeekly: +(platformData.postsCount / 4.2).toFixed(1),
      };
    });
  }, [competitors, activePlatform]);

  // Sort and filter table rows
  const sortedCompetitors = useMemo(() => {
    let result = displayedCompetitors.filter(c =>
      c.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      c.handle.toLowerCase().includes(tableSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(tableSearch.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'followers') return b.followers - a.followers;
      if (sortBy === 'engagement') return b.engagementRate - a.engagementRate;
      if (sortBy === 'sentiment') return b.sentimentScore - a.sentimentScore;
      if (sortBy === 'cadence') return b.postCadence30d - a.postCadence30d;
      return 0;
    });

    return result;
  }, [displayedCompetitors, tableSearch, sortBy]);

  // Months labels for trajectory
  const trajectoryLabels = ['Nov 23', 'Dec 23', 'Jan 24', 'Feb 24 (Overtake)', 'Mar 24', 'Apr 24'];

  const userBrand = displayedCompetitors.find(c => c.isUserBrand) || displayedCompetitors[0];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Toast notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-secondary-container text-on-secondary-container font-semibold text-[13px] flex items-center gap-2 animate-in fade-in shadow-xs">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Context & Header Action Deck */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-primary font-bold px-2 py-0.5 rounded-full bg-primary-fixed">
              Competitor Benchmark Suite
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[11px] font-semibold">Live Sync Active</span>
            </div>
            <button
              onClick={handleSyncNow}
              className="text-[12px] text-outline hover:text-on-surface flex items-center gap-1 transition-colors cursor-pointer"
              title="Click to refresh benchmark telemetry"
            >
              <span className={`material-symbols-outlined text-[14px] ${isSyncing ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{isSyncing ? 'Syncing...' : `Refreshed ${syncTimeAgo}`}</span>
            </button>
          </div>
          <h1 className="font-headline text-2xl lg:text-3xl text-on-surface font-extrabold tracking-tight">
            SaaS &amp; Tech Creators Benchmark
          </h1>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Segmented Time Frame Controls */}
          <div className="flex items-center p-1 bg-surface-container-high rounded-lg shadow-2xs border border-[#eaedff]">
            {(['30d', 'q2', '6m'] as const).map((tf) => {
              const label = tf === '30d' ? 'Last 30 Days' : tf === 'q2' ? 'Q2 2024' : '6 Months';
              const isSelected = activeTimeframe === tf;
              return (
                <button
                  key={tf}
                  type="button"
                  onClick={() => onChangeTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Secondary Export Action */}
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface transition-colors text-[13px] font-semibold shadow-xs border border-[#eaedff] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">file_download</span>
            <span>Export CSV</span>
          </button>

          {/* Primary Add Competitor */}
          <button
            onClick={onOpenAddCompetitor}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-[13px] font-semibold shadow-sm transition-all cursor-pointer active:scale-[0.98]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Add Competitor</span>
          </button>
        </div>
      </div>

      {/* Benchmark Visualizations Grid (Share of Voice + Trajectory) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card 1: Share of Voice Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-[#eaedff] flex flex-col justify-between">
          <div>
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">
                  Audience Mindshare
                </span>
                <span className="flex items-center gap-1 text-[11px] text-secondary font-semibold bg-secondary-container px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  +4.8% pt
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <h2 className="font-headline text-[18px] text-on-surface font-bold">Share of Voice</h2>
                <span className="text-[12px] text-outline">Aggregated Mentions</span>
              </div>
            </div>

            {/* Visual Proportion Multi-Bar */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden flex shadow-2xs">
                {displayedCompetitors.map((c) => (
                  <div
                    key={c.id}
                    className="h-full transition-all duration-500 hover:opacity-85 cursor-pointer relative group"
                    style={{
                      width: `${c.shareOfVoice}%`,
                      backgroundColor: c.color,
                    }}
                    title={`${c.name}: ${c.shareOfVoice}%`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-on-surface-variant text-[12px]">
                <span>Overall Total: 284.6k Interactions</span>
                <span className="text-primary font-bold">
                  {userBrand?.name} Leads ({userBrand?.shareOfVoice}%)
                </span>
              </div>
            </div>
          </div>

          {/* Legend Matrix Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#eaedff]/60">
            {displayedCompetitors.map((c) => (
              <div
                key={c.id}
                onClick={() => onOpenDetailModal(c)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-[#eaedff]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-[12px] text-on-surface font-semibold truncate">
                    {c.name} {c.isUserBrand && '(You)'}
                  </span>
                </div>
                <span className="text-[13px] font-bold text-on-surface font-mono tabular-nums ml-1">
                  {c.shareOfVoice}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Growth Velocity Trajectory Multi-Line Chart (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-[#eaedff] flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline text-[18px] text-on-surface font-bold">
                    Growth Velocity Trajectory
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-fixed text-on-primary-fixed-variant">
                    Follower Scale
                  </span>
                </div>
                <p className="text-[12px] text-outline mt-0.5">
                  Historical trajectory tracked across 6 months (Nov - Apr)
                </p>
              </div>

              {/* Overtake Alert Flag Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-error-container text-on-error-container self-start sm:self-auto shadow-2xs">
                <span className="material-symbols-outlined text-[16px] text-error">flag</span>
                <span className="text-[11px] font-semibold">Overtake Alert: +14d Window</span>
              </div>
            </div>

            {/* Inline Vector Chart Visualization */}
            <div className="relative w-full h-48 my-2">
              <svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 540 160"
              >
                <defs>
                  <linearGradient id="primaryGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4648d4" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#4648d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Guideline Stripes */}
                <line x1="0" y1="20" x2="540" y2="20" stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="65" x2="540" y2="65" stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="110" x2="540" y2="110" stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="150" x2="540" y2="150" stroke="#dae2fd" strokeWidth="1" />

                {/* Area fill for Acme Media (You) */}
                <path
                  d="M 0,118 Q 110,110 200,90 T 360,52 T 540,24 L 540,150 L 0,150 Z"
                  fill="url(#primaryGradient)"
                />

                {/* Competitor AlphaBrand (Teal Line) */}
                <path
                  d="M 0,95 Q 120,88 230,78 T 400,60 T 540,50"
                  fill="none"
                  stroke="#007cb1"
                  strokeLinecap="round"
                  strokeWidth="2"
                />

                {/* Competitor PulseMedia (Slate/Dashed Line) */}
                <path
                  d="M 0,132 Q 130,126 260,118 T 420,105 T 540,94"
                  fill="none"
                  stroke="#c7c4d7"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  strokeWidth="2"
                />

                {/* Acme Media / Your Brand (Thick Primary Accent Line) */}
                <path
                  d="M 0,118 Q 110,110 200,90 T 360,52 T 540,24"
                  fill="none"
                  stroke="#4648d4"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                {/* Intersection Point Marker: The Overtake Point in February */}
                <circle
                  cx="282"
                  cy="74"
                  r="5"
                  className="cursor-pointer"
                  fill="#ffffff"
                  stroke="#4648d4"
                  strokeWidth="3"
                  onMouseEnter={() => setHoveredChartPoint(3)}
                  onMouseLeave={() => setHoveredChartPoint(null)}
                />

                {/* Current Apex Node */}
                <circle
                  cx="540"
                  cy="24"
                  r="4.5"
                  fill="#4648d4"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredChartPoint(5)}
                  onMouseLeave={() => setHoveredChartPoint(null)}
                />
              </svg>

              {/* Hover Tooltip */}
              {hoveredChartPoint === 3 && (
                <div className="absolute left-[50%] top-6 -translate-x-1/2 bg-slate-900 text-white text-[11px] py-1.5 px-3 rounded-lg shadow-lg pointer-events-none flex flex-col gap-0.5">
                  <span className="font-bold text-secondary">Feb 2024 Inflection Point</span>
                  <span>Acme Media (788k) overtook AlphaBrand (758k)</span>
                </div>
              )}
            </div>

            {/* Timeline axis */}
            <div className="flex items-center justify-between text-outline text-[11px] pt-1 font-mono">
              {trajectoryLabels.map((lbl, idx) => (
                <span
                  key={lbl}
                  className={idx === 3 ? 'text-primary font-bold' : ''}
                >
                  {lbl}
                </span>
              ))}
            </div>
          </div>

          {/* Trajectory Legend */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#eaedff]/60 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-primary" />
              <span className="text-[12px] text-on-surface font-semibold font-mono tabular-nums">
                Acme Media (842k)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-[#007cb1]" />
              <span className="text-[12px] text-on-surface-variant font-mono tabular-nums">
                AlphaBrand (786k)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-[#c7c4d7]" />
              <span className="text-[12px] text-on-surface-variant font-mono tabular-nums">
                PulseMedia (654k)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Standings Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eaedff]">
          <div>
            <h2 className="font-headline text-[18px] text-on-surface font-bold">
              Leaderboard Standings
            </h2>
            <p className="text-[12px] text-outline mt-0.5">
              {activePlatform === 'all'
                ? 'Real-time aggregate across Instagram, TikTok, LinkedIn, and X'
                : `Filtered view for ${activePlatform.toUpperCase()} performance`}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search within table */}
            <div className="relative">
              <span className="material-symbols-outlined text-[16px] text-outline absolute left-2.5 top-2">
                search
              </span>
              <input
                type="text"
                placeholder="Filter brands..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-surface-container-low text-[13px] text-on-surface outline-none border border-[#eaedff] focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Sort by dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">
                Sort by:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-surface-container-low text-on-surface text-[13px] font-semibold px-3 py-1.5 pr-8 rounded-lg outline-none cursor-pointer border border-[#eaedff]"
                >
                  <option value="followers">Total Followers</option>
                  <option value="engagement">Engagement Rate</option>
                  <option value="sentiment">Sentiment Score</option>
                  <option value="cadence">Post Velocity</option>
                </select>
                <span className="material-symbols-outlined text-[16px] text-outline absolute right-2 top-2 pointer-events-none">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Body Component */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low h-10 text-[11px] text-outline uppercase tracking-wider font-semibold">
                <th className="py-2 px-6 w-16">Rank</th>
                <th className="py-2 px-4">Brand / Creator</th>
                <th className="py-2 px-4">Followers &amp; 30d Δ</th>
                <th className="py-2 px-4">Avg. Engagement</th>
                <th className="py-2 px-4">Post Cadence</th>
                <th className="py-2 px-6">Sentiment Score</th>
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-on-surface divide-y divide-[#eaedff]/60">
              {sortedCompetitors.map((item, index) => {
                const rankNumber = index + 1;
                return (
                  <tr
                    key={item.id}
                    className={`h-16 transition-colors hover:bg-surface-container-low/60 ${
                      item.isUserBrand ? 'bg-surface-container-low/30' : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-6">
                      <span
                        className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-[12px] shadow-2xs ${
                          rankNumber === 1
                            ? 'bg-primary text-white'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {rankNumber}
                      </span>
                    </td>

                    {/* Brand / Creator */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-contain bg-surface-container p-1 shadow-2xs border border-[#eaedff]"
                            src={item.avatar}
                            onError={(e) => {
                              e.currentTarget.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(item.name)}`;
                            }}
                          />
                          {item.isUserBrand && (
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[13px] font-bold text-on-surface">
                              {item.name}
                            </span>
                            {item.tag && (
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${item.tagColor}`}
                              >
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-outline">
                            {item.handle} • {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Followers & 30d Delta */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-on-surface font-mono tabular-nums">
                          {item.followers.toLocaleString()}
                        </span>
                        <span
                          className={`flex items-center gap-0.5 text-[11px] font-semibold font-mono tabular-nums ${
                            item.followerGrowthRate >= 0 ? 'text-secondary' : 'text-error'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {item.followerGrowthRate >= 0 ? 'arrow_upward' : 'arrow_downward'}
                          </span>
                          {item.followerGrowthRate >= 0 ? '+' : ''}
                          {item.followerGrowthRate}% (
                          {item.followerGrowthCount >= 0 ? '+' : ''}
                          {(item.followerGrowthCount / 1000).toFixed(1)}k)
                        </span>
                      </div>
                    </td>

                    {/* Avg Engagement */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[15px] font-bold text-on-surface font-mono tabular-nums">
                            {item.engagementRate}%
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              item.benchmarkDelta.startsWith('+')
                                ? 'bg-secondary-container text-on-secondary-container'
                                : 'bg-error-container text-on-error-container'
                            }`}
                          >
                            {item.benchmarkDelta}
                          </span>
                        </div>
                        <span className="text-[11px] text-outline">
                          {item.benchmarkSubtext}
                        </span>
                      </div>
                    </td>

                    {/* Post Cadence */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-on-surface font-mono tabular-nums">
                          {item.postCadence30d} posts / 30d
                        </span>
                        <span className="text-[11px] text-outline font-mono tabular-nums">
                          {item.postCadenceWeekly} posts/week avg
                        </span>
                      </div>
                    </td>

                    {/* Sentiment Score */}
                    <td className="py-3 px-6">
                      <div className="flex flex-col gap-1 w-44">
                        <div className="flex items-center justify-between text-[11px]">
                          <span
                            className={`font-bold ${
                              item.sentimentScore >= 90
                                ? 'text-secondary'
                                : item.sentimentScore >= 80
                                ? 'text-tertiary'
                                : 'text-outline'
                            }`}
                          >
                            {item.sentimentLabel}
                          </span>
                          <span className="text-outline font-medium">
                            {item.sentimentRating}
                          </span>
                        </div>
                        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.sentimentScore >= 90
                                ? 'bg-secondary'
                                : item.sentimentScore >= 80
                                ? 'bg-tertiary'
                                : 'bg-outline'
                            }`}
                            style={{ width: `${item.sentimentScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onOpenDetailModal(item)}
                        className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                        title="View Competitive Deep Dive"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">analytics</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footnote Pagination / Summary Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-surface-container-low text-[12px] text-outline border-t border-[#eaedff]">
          <span>
            Showing {sortedCompetitors.length} tracked competitors in your segment
          </span>
          <div className="flex items-center gap-1">
            <button
              className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface text-[12px] font-semibold shadow-2xs border border-[#eaedff]"
              type="button"
            >
              1
            </button>
            <button
              className="px-2.5 py-1 rounded text-outline hover:text-on-surface hover:bg-surface-container text-[12px] transition-colors"
              type="button"
            >
              2
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Gap Analysis & Actionable Opportunities (3-column Cards) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-[18px] text-on-surface font-bold">
              Strategic Gap Analysis
            </h2>
            <p className="text-[12px] text-outline">
              Algorithmic anomalies and growth leverage derived from 30-day competitor signals
            </p>
          </div>
          <button
            onClick={onOpenPlaybook}
            className="text-[12px] text-primary font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>View Intelligence Playbook</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Opportunity Card 1: Posting Cadence Advantage */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-[#eaedff] flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-secondary-container text-on-secondary-container flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Advantage: High
                </span>
                <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">
                  Publishing Velocity
                </span>
              </div>
              <h3 className="font-headline text-[16px] text-on-surface font-bold">
                Posting Cadence Arbitrage
              </h3>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                You publish <strong className="text-on-surface">4.2x/week</strong> compared to the direct competitor group average of <strong className="text-on-surface">2.8x/week</strong>, generating a sustained <span className="text-secondary font-semibold">+1.5x visibility compound advantage</span> in algorithm discovery feeds.
              </p>

              <div className="bg-surface-container-low p-3 rounded-xl border border-[#eaedff] flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[11px] text-outline font-semibold">Impression Multiplier</span>
                  <span className="font-headline text-xl text-on-surface font-bold font-mono">
                    +52.4%
                  </span>
                </div>
                <div className="h-8 w-12 flex items-end gap-1">
                  <span className="w-2.5 h-4 bg-outline-variant rounded-t-xs" />
                  <span className="w-2.5 h-6 bg-outline rounded-t-xs" />
                  <span className="w-2.5 h-8 bg-primary rounded-t-xs" />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={() => {
                  onToggleOpportunity('cadence-arbitrage');
                  setToastMessage('Cadence pacing rule locked to 4.2x/week.');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className={`w-full py-2.5 rounded-xl font-semibold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  opportunities.find(o => o.id === 'cadence-arbitrage')?.applied
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                }`}
                type="button"
              >
                <span>
                  {opportunities.find(o => o.id === 'cadence-arbitrage')?.applied
                    ? '✓ Cadence Rule Active'
                    : 'Maintain Cadence Rule'}
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Opportunity Card 2: Carousel Content Gap */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-[#eaedff] flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary-fixed text-on-primary-fixed-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">lightbulb</span>
                  Opportunity Gap
                </span>
                <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">
                  Format Arbitrage
                </span>
              </div>
              <h3 className="font-headline text-[16px] text-on-surface font-bold">
                Multi-Slide Carousels
              </h3>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Competitors capture <strong className="text-primary font-bold">+41% higher bookmark saves</strong> by distributing structured visual slides over single imagery. Your profile currently publishes 78% single-asset formats.
              </p>

              <div className="bg-surface-container-low p-3 rounded-xl border border-[#eaedff] flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[11px] text-outline font-semibold">Potential Save Uplift</span>
                  <span className="font-headline text-xl text-primary font-bold font-mono">
                    +3.2k saves
                  </span>
                </div>
                <span className="material-symbols-outlined text-[28px] text-primary">view_carousel</span>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={onOpenCarouselSprint}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-semibold text-[13px] shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                type="button"
              >
                <span>Plan Carousel Sprint</span>
                <span className="material-symbols-outlined text-[16px]">add_box</span>
              </button>
            </div>
          </div>

          {/* Opportunity Card 3: Timing Arbitrage Shift */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-[#eaedff] flex flex-col justify-between transition-all hover:shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Timing Signal
                </span>
                <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">
                  Peak Windows
                </span>
              </div>
              <h3 className="font-headline text-[16px] text-on-surface font-bold">
                11:00 AM EST Distribution
              </h3>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">AlphaBrand</strong> extracts a <span className="text-tertiary font-bold">+30% early engagement boost</span> by targeting the 11:00 AM EST tech executive lunch window. Your posts cluster predominantly after 3:00 PM EST.
              </p>

              <div className="bg-surface-container-low p-3 rounded-xl border border-[#eaedff] flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-[11px] text-outline font-semibold">Recommended Target</span>
                  <span className="font-headline text-xl text-tertiary font-bold font-mono">
                    11:15 AM EST
                  </span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant text-[12px]">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">bolt</span>
                  <span className="font-semibold">Optimal Index</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={() => {
                  onToggleOpportunity('timing-shift');
                  setToastMessage('Auto-Schedule Slot set to 11:15 AM EST.');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className={`w-full py-2.5 rounded-xl font-semibold text-[13px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  opportunities.find(o => o.id === 'timing-shift')?.applied
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                }`}
                type="button"
              >
                <span>
                  {opportunities.find(o => o.id === 'timing-shift')?.applied
                    ? '✓ 11:15 AM Slot Applied'
                    : 'Apply Auto-Schedule Slot'}
                </span>
                <span className="material-symbols-outlined text-[16px]">alarm_on</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
