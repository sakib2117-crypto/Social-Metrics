import React, { useState } from 'react';
import { ScheduledPost } from '../types';

interface CarouselSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleSprint: (post: ScheduledPost) => void;
}

export const CarouselSprintModal: React.FC<CarouselSprintModalProps> = ({
  isOpen,
  onClose,
  onScheduleSprint,
}) => {
  const [topic, setTopic] = useState('Modular vs Monolithic Architecture: Cost & Latency Benchmark');
  const [slideCount, setSlideCount] = useState(8);
  const [targetDate, setTargetDate] = useState('Tomorrow');
  const [targetTime, setTargetTime] = useState('11:15 AM EST');
  const [selectedChannels, setSelectedChannels] = useState<('linkedin' | 'instagram')[]>(['linkedin', 'instagram']);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleToggleChannel = (ch: 'linkedin' | 'instagram') => {
    if (selectedChannels.includes(ch)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter(c => c !== ch));
      }
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleConfirm = () => {
    const newPost: ScheduledPost = {
      id: `sprint-${Date.now()}`,
      content: `${topic} (${slideCount} visual slides breakdown)`,
      platforms: selectedChannels,
      format: 'carousel',
      scheduledDate: targetDate,
      scheduledTime: targetTime,
      status: 'scheduled',
      slidesCount: slideCount,
    };

    onScheduleSprint(newPost);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 shadow-xl border border-[#eaedff]">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">view_carousel</span>
            <div className="flex flex-col">
              <h2 className="font-headline text-lg font-bold text-on-surface">Plan High-Yield Carousel Sprint</h2>
              <span className="text-[12px] text-outline">Targeting +3.2k saves &amp; bookmark algorithmic boost</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface">Carousel Sprint Scheduled!</h3>
            <p className="text-[13px] text-outline">
              Added to Content Planner for {targetDate} at {targetTime}.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <div className="p-3 rounded-lg bg-surface-container-low border border-[#eaedff] text-[12px] text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0">lightbulb</span>
              <span>
                <strong>Algorithmic Arbitrage:</strong> Carousels generate <strong>2.8x</strong> more dwell time and <strong>41%</strong> more saves than static images in SaaS discovery feeds.
              </span>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant block mb-1.5">
                Carousel Topic &amp; Teardown Concept
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  '5 Architecture Decisions at $10M ARR',
                  'Postgres vs Cloud SQL Latency Comparison',
                  'The Anti-AI Slop Frontend Design Checklist',
                ].map((concept) => (
                  <button
                    key={concept}
                    type="button"
                    onClick={() => setTopic(concept)}
                    className="text-[11px] px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
                  >
                    + {concept}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">
                  Target Slide Count
                </label>
                <select
                  value={slideCount}
                  onChange={(e) => setSlideCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-on-surface outline-none cursor-pointer"
                >
                  <option value={6}>6 Slides (Compact Guide)</option>
                  <option value={8}>8 Slides (Optimal Retention)</option>
                  <option value={10}>10 Slides (Deep Teardown)</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-on-surface-variant block mb-1">
                  Recommended Slot
                </label>
                <div className="px-3 py-2 text-[13px] rounded-lg bg-surface-container-low border border-[#eaedff] text-primary font-semibold flex items-center justify-between">
                  <span>{targetTime}</span>
                  <span className="text-[10px] uppercase tracking-wider bg-primary-fixed px-1.5 py-0.5 rounded font-bold">
                    Peak Win
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant block mb-1.5">
                Target Distribution Channels
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-[13px]">
                  <input
                    type="checkbox"
                    checked={selectedChannels.includes('linkedin')}
                    onChange={() => handleToggleChannel('linkedin')}
                    className="rounded accent-primary w-4 h-4 cursor-pointer"
                  />
                  <span className="font-medium text-on-surface">LinkedIn Document Slide</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[13px]">
                  <input
                    type="checkbox"
                    checked={selectedChannels.includes('instagram')}
                    onChange={() => handleToggleChannel('instagram')}
                    className="rounded accent-primary w-4 h-4 cursor-pointer"
                  />
                  <span className="font-medium text-on-surface">Instagram Multi-Card Carousel</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#eaedff]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] font-medium text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 text-[13px] font-semibold text-white bg-primary hover:bg-primary-container rounded-lg transition-all shadow-sm cursor-pointer"
              >
                Schedule Carousel Sprint
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
