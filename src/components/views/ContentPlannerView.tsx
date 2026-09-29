import React from 'react';
import { ScheduledPost } from '../../types';

interface ContentPlannerViewProps {
  scheduledPosts: ScheduledPost[];
  onOpenNewPost: () => void;
  onOpenCarouselSprint: () => void;
}

export const ContentPlannerView: React.FC<ContentPlannerViewProps> = ({
  scheduledPosts,
  onOpenNewPost,
  onOpenCarouselSprint,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
            Content Planner &amp; Scheduling Engine
          </h1>
          <p className="text-[13px] text-outline mt-0.5">
            Synchronized social calendar tuned to competitor gap signals and optimal algorithmic windows
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCarouselSprint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-[13px] font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">view_carousel</span>
            <span>Plan Carousel Sprint</span>
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

      {/* Recommended Strategy Alert Banner */}
      <div className="p-4 rounded-xl bg-primary-fixed/40 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </span>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-on-surface">
              Cadence Target: 4.2 posts/week (Active)
            </span>
            <span className="text-[12px] text-on-surface-variant">
              You have 3 posts queued for this week. Optimal slot <strong>Tomorrow at 11:15 AM EST</strong> is currently reserved.
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-[11px] self-start sm:self-auto">
          Cadence on Track
        </span>
      </div>

      {/* Scheduled Queue */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs">
        <h2 className="font-headline text-[16px] font-bold text-on-surface mb-3">
          Queued &amp; Scheduled Posts ({scheduledPosts.length})
        </h2>
        <div className="flex flex-col gap-3">
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff] flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-[#eaedff] text-primary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">
                    {post.format === 'carousel' ? 'view_carousel' : post.format === 'video' ? 'play_circle' : 'article'}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-highest uppercase text-on-surface font-mono">
                      {post.status}
                    </span>
                    <span className="text-[11px] font-semibold text-primary">
                      {post.scheduledDate} · {post.scheduledTime}
                    </span>
                    {post.slidesCount && (
                      <span className="text-[11px] text-outline font-mono">
                        ({post.slidesCount} slides)
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-medium text-on-surface leading-snug">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {post.platforms.map((p) => (
                      <span key={p} className="text-[10px] font-mono capitalize px-1.5 py-0.2 rounded bg-surface-container text-outline">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-on-surface hover:bg-surface-container border border-[#eaedff] transition-colors cursor-pointer"
                >
                  Edit Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
