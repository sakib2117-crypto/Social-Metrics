import React from 'react';

interface IntelligencePlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntelligencePlaybookModal: React.FC<IntelligencePlaybookModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-[#eaedff]">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold text-on-surface">
                SaaS &amp; Tech Creator Intelligence Playbook
              </h2>
              <span className="text-[12px] text-outline">
                Algorithmic leverage heuristics derived from 284k+ social interactions
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-5 mt-5">
          {/* Chapter 1 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff]">
            <div className="flex items-center gap-2 text-primary font-bold text-[13px] mb-1">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Publishing Velocity &amp; Algorithm Compounding</span>
            </div>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              LinkedIn and X algorithms prioritize accounts that generate consistent mid-tier engagement over sporadic single hits. Publishing at <strong>4.0–4.5x weekly</strong> ensures your brand maintains unbroken 48-hour feed recirculation without triggering algorithmic fatigue limits.
            </p>
          </div>

          {/* Chapter 2 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff]">
            <div className="flex items-center gap-2 text-tertiary-container font-bold text-[13px] mb-1">
              <span className="w-5 h-5 rounded-full bg-tertiary-container text-white flex items-center justify-center text-[11px]">
                2
              </span>
              <span>The 11:00 AM EST Executive Decision Window</span>
            </div>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Data shows that 42% of B2B SaaS decision-makers consume feed content between 11:00 AM and 11:45 AM EST (transitioning into lunch and between morning syncs). By shifting post scheduling from 3:00 PM EST to <strong>11:15 AM EST</strong>, early initial velocity jumps <strong>+30%</strong>, accelerating the algorithmic breakout threshold.
            </p>
          </div>

          {/* Chapter 3 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff]">
            <div className="flex items-center gap-2 text-secondary font-bold text-[13px] mb-1">
              <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Format Arbitrage: The Power of Document Carousels</span>
            </div>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Single-image posts yield high impressions but low dwell time. Carousels with 6–10 slides force horizontal swipes, signaling high user utility. Algorithms register <strong>"Bookmark Saves"</strong> as a 5x multiplier over casual likes, pushing carousels into the secondary "Suggested For You" feed.
            </p>
          </div>

          {/* Chapter 4 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff]">
            <div className="flex items-center gap-2 text-on-surface font-bold text-[13px] mb-1">
              <span className="w-5 h-5 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-[11px]">
                4
              </span>
              <span>Sentiment Shielding &amp; Brand Equity</span>
            </div>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Acme Media currently enjoys <strong>94% Positive Sentiment</strong>. To protect this advantage against aggressive competitor campaigns, monitor comment velocity within the first 60 minutes and actively address technical questions directly from verified founders or team members.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end pt-5 mt-5 border-t border-[#eaedff]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-primary hover:bg-primary-container rounded-lg transition-all shadow-sm cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
