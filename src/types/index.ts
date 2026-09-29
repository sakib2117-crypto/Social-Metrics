export type Platform = 'all' | 'instagram' | 'tiktok' | 'linkedin' | 'x' | 'youtube';

export type Timeframe = '30d' | 'q2' | '6m';

export type NavTab = 
  | 'overview' 
  | 'audience-insights' 
  | 'engagement' 
  | 'competitor-analysis' 
  | 'content-planner' 
  | 'reports' 
  | 'settings';

export interface CompetitorPost {
  id: string;
  title: string;
  platform: 'instagram' | 'tiktok' | 'linkedin' | 'x' | 'youtube';
  type: 'carousel' | 'video' | 'image' | 'text';
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
  postedAt: string;
  thumbnailUrl?: string;
  summary: string;
}

export interface Competitor {
  id: string;
  name: string;
  handle: string;
  category: string;
  avatar: string;
  isUserBrand: boolean;
  tag?: string;
  tagColor?: string;
  followers: number;
  followerGrowthRate: number;
  followerGrowthCount: number;
  engagementRate: number;
  benchmarkDelta: string;
  benchmarkSubtext: string;
  postCadence30d: number;
  postCadenceWeekly: number;
  sentimentScore: number;
  sentimentLabel: string;
  sentimentRating: string;
  shareOfVoice: number;
  color: string;
  trajectory: {
    '30d': number[];
    'q2': number[];
    '6m': number[];
  };
  platformBreakdown: Record<Exclude<Platform, 'all'>, {
    followers: number;
    engagementRate: number;
    postsCount: number;
  }>;
  topPosts: CompetitorPost[];
  strengths: string[];
  weaknesses: string[];
}

export interface StrategicOpportunity {
  id: string;
  type: 'cadence' | 'carousel' | 'timing' | 'custom';
  badgeTitle: string;
  badgeType: 'advantage' | 'opportunity' | 'timing';
  categoryLabel: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricIcon?: string;
  actionText: string;
  applied: boolean;
}

export interface ScheduledPost {
  id: string;
  content: string;
  platforms: Exclude<Platform, 'all'>[];
  format: 'carousel' | 'video' | 'image' | 'text';
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'draft' | 'published';
  slidesCount?: number;
}
