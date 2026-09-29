import { Competitor } from '../types';

export function exportCompetitorsToCSV(competitors: Competitor[]) {
  const headers = [
    'Rank',
    'Brand Name',
    'Handle',
    'Category',
    'Total Followers',
    '30d Growth Rate (%)',
    '30d Growth Count',
    'Engagement Rate (%)',
    'Benchmark Delta',
    'Post Cadence (30d)',
    'Weekly Cadence (avg)',
    'Sentiment Score (%)',
    'Sentiment Rating',
    'Share of Voice (%)',
  ];

  const rows = competitors.map((c, idx) => [
    idx + 1,
    `"${c.name.replace(/"/g, '""')}"`,
    c.handle,
    `"${c.category}"`,
    c.followers,
    c.followerGrowthRate,
    c.followerGrowthCount,
    c.engagementRate,
    `"${c.benchmarkDelta}"`,
    c.postCadence30d,
    c.postCadenceWeekly,
    c.sentimentScore,
    `"${c.sentimentRating}"`,
    c.shareOfVoice,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SocialMetrics_Competitor_Benchmark_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
