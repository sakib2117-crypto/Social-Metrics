import React from 'react';
import { Competitor } from '../types';

interface CompetitorDetailModalProps {
  competitor: Competitor | null;
  userBrand: Competitor;
  isOpen: boolean;
  onClose: () => void;
  onRemoveCompetitor?: (id: string) => void;
}

export const CompetitorDetailModal: React.FC<CompetitorDetailModalProps> = ({
  competitor,
  userBrand,
  isOpen,
  onClose,
  onRemoveCompetitor,
}) => {
  if (!isOpen || !competitor) return null;

  const isSelf = competitor.id === userBrand.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#eaedff]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-3">
            <img
              src={competitor.avatar}
              alt={competitor.name}
              className="w-12 h-12 rounded-xl object-contain bg-surface-container p-1 border border-[#eaedff]"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(competitor.name)}`;
              }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-xl font-bold text-on-surface">
                  {competitor.name}
                </h2>
                {competitor.tag && (
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${competitor.tagColor}`}>
                    {competitor.tag}
                  </span>
                )}
              </div>
              <span className="text-[13px] text-outline">
                {competitor.handle} · {competitor.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Head-to-Head Comparison Metrics */}
        {!isSelf && (
          <div className="mt-5 p-4 rounded-xl bg-surface-container-low border border-[#eaedff]">
            <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-3">
              Head-to-Head Benchmark vs. Acme Media (You)
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-surface-container-lowest p-3 rounded-lg border border-[#eaedff]/60">
                <span className="text-[11px] text-outline block">Follower Delta</span>
                <span className="text-[16px] font-bold text-on-surface font-mono tabular-nums">
                  {competitor.followers > userBrand.followers ? '-' : '+'}
                  {Math.abs(userBrand.followers - competitor.followers).toLocaleString()}
                </span>
                <span className="text-[11px] text-secondary font-medium block mt-0.5">
                  {competitor.followers < userBrand.followers ? 'You lead audience' : 'Competitor leads'}
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-lg border border-[#eaedff]/60">
                <span className="text-[11px] text-outline block">Engagement Spread</span>
                <span className="text-[16px] font-bold text-on-surface font-mono tabular-nums">
                  {(userBrand.engagementRate - competitor.engagementRate).toFixed(2)}%
                </span>
                <span className="text-[11px] text-primary font-medium block mt-0.5">
                  Your baseline {userBrand.engagementRate}%
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-lg border border-[#eaedff]/60">
                <span className="text-[11px] text-outline block">30d Velocity Ratio</span>
                <span className="text-[16px] font-bold text-on-surface font-mono tabular-nums">
                  {(userBrand.postCadenceWeekly / competitor.postCadenceWeekly).toFixed(1)}x
                </span>
                <span className="text-[11px] text-outline font-medium block mt-0.5">
                  {userBrand.postCadenceWeekly}/wk vs {competitor.postCadenceWeekly}/wk
                </span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-lg border border-[#eaedff]/60">
                <span className="text-[11px] text-outline block">Sentiment Gap</span>
                <span className="text-[16px] font-bold text-secondary font-mono tabular-nums">
                  +{userBrand.sentimentScore - competitor.sentimentScore}% pt
                </span>
                <span className="text-[11px] text-secondary font-medium block mt-0.5">
                  {competitor.sentimentScore}% vs {userBrand.sentimentScore}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Platform Breakdown Cards */}
        <div className="mt-5">
          <h3 className="font-headline text-[15px] font-bold text-on-surface mb-3">
            Cross-Channel Breakdown
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {Object.entries(competitor.platformBreakdown).map(([platform, data]) => (
              <div
                key={platform}
                className="p-3 rounded-xl bg-surface-container-lowest border border-[#eaedff] flex flex-col gap-1"
              >
                <div className="flex items-center justify-between text-outline text-[12px] font-semibold capitalize">
                  <span>{platform}</span>
                </div>
                <span className="text-[15px] font-bold text-on-surface font-mono tabular-nums mt-1">
                  {data.followers.toLocaleString()}
                </span>
                <div className="flex items-center justify-between text-[11px] text-outline pt-1 border-t border-[#eaedff]/60">
                  <span>Eng: {data.engagementRate}%</span>
                  <span>{data.postsCount} posts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Strengths & Vulnerabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff]">
            <div className="flex items-center gap-1.5 text-secondary font-semibold text-[13px] mb-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Observed Competitive Strengths</span>
            </div>
            <ul className="flex flex-col gap-1.5 text-[13px] text-on-surface-variant">
              {competitor.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-secondary font-bold">·</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff]">
            <div className="flex items-center gap-1.5 text-error font-semibold text-[13px] mb-2">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span>Strategic Vulnerabilities &amp; Gaps</span>
            </div>
            <ul className="flex flex-col gap-1.5 text-[13px] text-on-surface-variant">
              {competitor.weaknesses.map((wk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-error font-bold">·</span>
                  <span>{wk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Performing Posts */}
        {competitor.topPosts && competitor.topPosts.length > 0 && (
          <div className="mt-5">
            <h3 className="font-headline text-[15px] font-bold text-on-surface mb-3">
              Top Outlier Posts (Highest Reach &amp; Engagement)
            </h3>
            <div className="flex flex-col gap-2.5">
              {competitor.topPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-[#eaedff] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-highest text-on-surface uppercase font-mono">
                        {post.platform}
                      </span>
                      <span className="text-[11px] text-outline">{post.postedAt}</span>
                      <span className="text-[11px] text-primary font-semibold">
                        Format: {post.type}
                      </span>
                    </div>
                    <span className="text-[12px] font-bold text-secondary font-mono tabular-nums">
                      {post.engagementRate}% Engagement
                    </span>
                  </div>
                  <h4 className="text-[14px] font-semibold text-on-surface">{post.title}</h4>
                  <p className="text-[12px] text-on-surface-variant">{post.summary}</p>
                  <div className="flex items-center gap-4 text-[11px] text-outline pt-1 font-mono tabular-nums">
                    <span>❤️ {post.likes.toLocaleString()} likes</span>
                    <span>💬 {post.comments.toLocaleString()} comments</span>
                    <span>🔁 {post.shares.toLocaleString()} shares</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-[#eaedff]">
          {!isSelf && onRemoveCompetitor ? (
            <button
              onClick={() => {
                if (confirm(`Stop tracking ${competitor.name}?`)) {
                  onRemoveCompetitor(competitor.id);
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-error hover:bg-error-container/30 transition-colors cursor-pointer"
            >
              Stop Tracking
            </button>
          ) : (
            <span className="text-[12px] text-outline">Primary Profile</span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
