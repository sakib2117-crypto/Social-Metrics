import React, { useState } from 'react';
import { Platform, ScheduledPost } from '../types';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePost: (post: ScheduledPost) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSavePost,
}) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Exclude<Platform, 'all'>[]>(['linkedin', 'x']);
  const [format, setFormat] = useState<'carousel' | 'video' | 'image' | 'text'>('carousel');
  const [scheduledDate, setScheduledDate] = useState('Tomorrow');
  const [scheduledTime, setScheduledTime] = useState('11:15 AM EST');
  const [slidesCount, setSlidesCount] = useState(8);

  if (!isOpen) return null;

  const togglePlatform = (p: Exclude<Platform, 'all'>) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(item => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handlePublish = (status: 'scheduled' | 'draft') => {
    if (!content.trim()) return;

    const newPost: ScheduledPost = {
      id: `post-${Date.now()}`,
      content: content.trim(),
      platforms: selectedPlatforms,
      format,
      scheduledDate,
      scheduledTime,
      status,
      slidesCount: format === 'carousel' ? slidesCount : undefined,
    };

    onSavePost(newPost);
    setContent('');
    onClose();
  };

  const platformNames: Record<Exclude<Platform, 'all'>, string> = {
    linkedin: 'LinkedIn',
    x: 'X',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    youtube: 'YouTube',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#eaedff]">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">edit_note</span>
            <h2 className="font-headline text-lg font-bold text-on-surface">Compose New Social Post</h2>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {/* Target Platforms */}
          <div>
            <label className="text-[12px] font-semibold text-on-surface-variant block mb-1.5">
              Publish To Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {(['linkedin', 'x', 'instagram', 'tiktok', 'youtube'] as const).map((p) => {
                const isSelected = selectedPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface-variant border-[#eaedff] hover:bg-surface-container'
                    }`}
                  >
                    {platformNames[p]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <label className="text-[12px] font-semibold text-on-surface-variant block mb-1.5">
              Content Format
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'carousel' as const, label: 'Carousel', icon: 'view_carousel' },
                { id: 'image' as const, label: 'Single Image', icon: 'image' },
                { id: 'video' as const, label: 'Short Video', icon: 'play_circle' },
                { id: 'text' as const, label: 'Text Thread', icon: 'notes' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setFormat(fmt.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-[12px] font-medium transition-colors cursor-pointer ${
                    format === fmt.id
                      ? 'bg-surface-container border-primary text-primary font-bold shadow-xs'
                      : 'bg-surface-container-low border-[#eaedff] text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] mb-1">{fmt.icon}</span>
                  <span>{fmt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {format === 'carousel' && (
            <div className="p-3 rounded-lg bg-surface-container-low border border-[#eaedff] flex items-center justify-between">
              <span className="text-[12px] font-medium text-on-surface">Slide Deck Count:</span>
              <div className="flex items-center gap-1.5">
                {[5, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSlidesCount(num)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      slidesCount === num
                        ? 'bg-primary text-white'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {num} slides
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Post Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] font-semibold text-on-surface-variant">
                Post Copy / Hook
              </label>
              <span className="text-[11px] text-outline font-mono tabular-nums">
                {content.length} characters
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="What high-signal insight or breakdown are you sharing today? (e.g. 5 Architecture Decisions at $10M ARR...)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-[#eaedff] text-[13px] text-on-surface outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Timing recommendation prompt */}
          <div className="p-3 rounded-xl bg-secondary-container/40 border border-secondary/20 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2 text-on-secondary-container">
              <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
              <span>
                Recommended slot: <strong>11:15 AM EST</strong> (+30% exec reach)
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setScheduledTime('11:15 AM EST');
                setScheduledDate('Tomorrow');
              }}
              className="text-secondary font-bold hover:underline cursor-pointer"
            >
              Use Optimal
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#eaedff]">
            <button
              type="button"
              onClick={() => handlePublish('draft')}
              disabled={!content.trim()}
              className="px-4 py-2 text-[13px] font-medium text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Save as Draft
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] font-medium text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handlePublish('scheduled')}
                disabled={!content.trim()}
                className="px-4 py-2 text-[13px] font-semibold text-white bg-primary hover:bg-primary-container rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
