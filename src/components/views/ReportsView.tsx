import React, { useState } from 'react';
import { Competitor } from '../../types';

interface ReportsViewProps {
  competitors: Competitor[];
  onExportCSV: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ competitors, onExportCSV }) => {
  const [reportType, setReportType] = useState('monthly');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      onExportCSV();
      setIsExporting(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
            Benchmark Reports &amp; Executive Digests
          </h1>
          <p className="text-[13px] text-outline mt-0.5">
            Stakeholder-ready social media competitive intelligence exports &amp; automated digests
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-[13px] font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>{isExporting ? 'Generating...' : 'Export Raw CSV'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline text-[16px] font-bold text-on-surface">Available Generated Digests</h2>
            <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-lg border border-[#eaedff]">
              <button
                type="button"
                onClick={() => setReportType('weekly')}
                className={`px-2.5 py-1 rounded text-[12px] font-semibold transition-all cursor-pointer ${
                  reportType === 'weekly' ? 'bg-white shadow-xs text-on-surface' : 'text-outline hover:text-on-surface'
                }`}
              >
                Weekly Sprint
              </button>
              <button
                type="button"
                onClick={() => setReportType('monthly')}
                className={`px-2.5 py-1 rounded text-[12px] font-semibold transition-all cursor-pointer ${
                  reportType === 'monthly' ? 'bg-white shadow-xs text-on-surface' : 'text-outline hover:text-on-surface'
                }`}
              >
                Monthly Executive
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                title: 'Q2 2024 SaaS Benchmark Review',
                period: 'April 1 - April 30, 2024',
                summary: 'Acme Media maintained #1 ranking in Share of Voice (38%) with +43.2k follower net growth.',
                downloads: '24 team views',
              },
              {
                title: 'March 2024 Competitor Velocity Teardown',
                period: 'March 1 - March 31, 2024',
                summary: 'AlphaBrand slowed post frequency (-18%) while TrendFlow gained viral TikTok reach (+32.8k).',
                downloads: '18 team views',
              },
              {
                title: 'February 2024 Overtake Event Report',
                period: 'February 1 - February 28, 2024',
                summary: 'Official inflection point: Acme Media overtook AlphaBrand at 788k milestone.',
                downloads: '32 team views',
              },
            ].map((rep) => (
              <div
                key={rep.title}
                className="p-4 rounded-xl bg-surface-container-low border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-[#eaedff] text-primary shrink-0">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-on-surface">{rep.title}</span>
                    <span className="text-[11px] text-outline font-mono">{rep.period}</span>
                    <p className="text-[12px] text-on-surface-variant mt-1">{rep.summary}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleExport}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-primary hover:bg-primary-fixed transition-colors self-end sm:self-auto cursor-pointer"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Automated Digest */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="font-headline text-[16px] font-bold text-on-surface mb-1">Automated Slack / Email Delivery</h2>
            <p className="text-[12px] text-outline mb-4">Send weekly Monday morning competitive delta summaries to leadership</p>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2.5 text-[13px] text-on-surface font-medium cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-primary w-4 h-4 cursor-pointer" />
                <span>Monday 9:00 AM EST Digest</span>
              </label>
              <label className="flex items-center gap-2.5 text-[13px] text-on-surface font-medium cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-primary w-4 h-4 cursor-pointer" />
                <span>Immediate Overtake Alerts (±5k gap)</span>
              </label>
              <label className="flex items-center gap-2.5 text-[13px] text-on-surface font-medium cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-primary w-4 h-4 cursor-pointer" />
                <span>Competitor Viral Outlier Alerts (&gt;5% eng)</span>
              </label>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#eaedff] text-[12px] text-outline">
            Recipient: <span className="font-mono text-on-surface font-semibold">sakibalzubaer505@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
