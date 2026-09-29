import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CompetitorBenchmarkView } from './components/views/CompetitorBenchmarkView';
import { OverviewView } from './components/views/OverviewView';
import { AudienceInsightsView } from './components/views/AudienceInsightsView';
import { EngagementView } from './components/views/EngagementView';
import { ContentPlannerView } from './components/views/ContentPlannerView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

import { AddCompetitorModal } from './components/AddCompetitorModal';
import { CompetitorDetailModal } from './components/CompetitorDetailModal';
import { CarouselSprintModal } from './components/CarouselSprintModal';
import { NewPostModal } from './components/NewPostModal';
import { IntelligencePlaybookModal } from './components/IntelligencePlaybookModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { NotificationsPopover, NotificationItem } from './components/NotificationsPopover';

import {
  INITIAL_COMPETITORS,
  INITIAL_OPPORTUNITIES,
  INITIAL_SCHEDULED_POSTS,
} from './data/mockData';
import { Competitor, NavTab, Platform, Timeframe, ScheduledPost } from './types';
import { exportCompetitorsToCSV } from './utils/csvExport';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('competitor-analysis');
  const [competitors, setCompetitors] = useState<Competitor[]>(INITIAL_COMPETITORS);
  const [activePlatform, setActivePlatform] = useState<Platform>('all');
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('30d');
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(INITIAL_SCHEDULED_POSTS);

  // Modals
  const [isAddCompetitorOpen, setIsAddCompetitorOpen] = useState(false);
  const [selectedCompetitorDetail, setSelectedCompetitorDetail] = useState<Competitor | null>(null);
  const [isCarouselSprintOpen, setIsCarouselSprintOpen] = useState(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Overtake Alert: TrendFlow Trajectory',
      description: 'TrendFlow is accelerating on TikTok (+8.2%). Estimated gap closing in 14 days.',
      timeAgo: '12m ago',
      type: 'alert',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Cadence Benchmark Milestone',
      description: 'Acme Media reached 4.2 posts/week average, maintaining +52.4% impression multiplier.',
      timeAgo: '1h ago',
      type: 'success',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'AlphaBrand Schedule Shift Detected',
      description: 'AlphaBrand moved key tech teardown release to 11:00 AM EST lunch window.',
      timeAgo: '4h ago',
      type: 'info',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleAddCompetitor = (newComp: Competitor) => {
    // Recalculate Share of Voice
    const updated = [...competitors, newComp];
    const totalRaw = updated.reduce((acc, c) => acc + c.followers, 0);
    const withShare = updated.map(c => ({
      ...c,
      shareOfVoice: Math.round((c.followers / totalRaw) * 100),
    }));
    setCompetitors(withShare);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Now Tracking: ${newComp.name}`,
        description: `Added ${newComp.handle} to competitor leaderboard and growth velocity graph.`,
        timeAgo: 'Just now',
        type: 'info',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleRemoveCompetitor = (id: string) => {
    const updated = competitors.filter(c => c.id !== id);
    const totalRaw = updated.reduce((acc, c) => acc + c.followers, 0);
    const withShare = updated.map(c => ({
      ...c,
      shareOfVoice: Math.round((c.followers / totalRaw) * 100),
    }));
    setCompetitors(withShare);
  };

  const handleToggleOpportunity = (id: string) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === id ? { ...opp, applied: !opp.applied } : opp
      )
    );
  };

  const handleSchedulePost = (post: ScheduledPost) => {
    setScheduledPosts(prev => [post, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Post Queued in Planner',
        description: `Scheduled "${post.content.slice(0, 45)}..." for ${post.scheduledDate} at ${post.scheduledTime}.`,
        timeAgo: 'Just now',
        type: 'success',
        read: false,
      },
      ...prev,
    ]);
  };

  const handleExportCSV = () => {
    exportCompetitorsToCSV(competitors);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const userBrand = competitors.find(c => c.isUserBrand) || competitors[0];

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        trackedCount={competitors.length}
        maxTrackedCount={10}
        onOpenUpgrade={() => setCurrentTab('settings')}
      />

      {/* Main Layout Area */}
      <div className="pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          activePlatform={activePlatform}
          onChangePlatform={setActivePlatform}
          activeTimeframe={activeTimeframe}
          onChangeTimeframe={setActiveTimeframe}
          onOpenNewPost={() => setIsNewPostOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          unreadNotificationsCount={unreadCount}
        />

        {/* Notifications Popover Drawer */}
        <NotificationsPopover
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
        />

        {/* Main Viewport Content */}
        <main className="relative pt-20 px-6 py-6 w-full flex-1">
          {currentTab === 'competitor-analysis' && (
            <CompetitorBenchmarkView
              competitors={competitors}
              activePlatform={activePlatform}
              activeTimeframe={activeTimeframe}
              onChangeTimeframe={setActiveTimeframe}
              opportunities={opportunities}
              onToggleOpportunity={handleToggleOpportunity}
              onOpenAddCompetitor={() => setIsAddCompetitorOpen(true)}
              onOpenDetailModal={(comp) => setSelectedCompetitorDetail(comp)}
              onOpenCarouselSprint={() => setIsCarouselSprintOpen(true)}
              onOpenPlaybook={() => setIsPlaybookOpen(true)}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentTab === 'overview' && (
            <OverviewView
              competitors={competitors}
              onNavigateToCompetitors={() => setCurrentTab('competitor-analysis')}
              onOpenNewPost={() => setIsNewPostOpen(true)}
            />
          )}

          {currentTab === 'audience-insights' && (
            <AudienceInsightsView competitors={competitors} />
          )}

          {currentTab === 'engagement' && <EngagementView />}

          {currentTab === 'content-planner' && (
            <ContentPlannerView
              scheduledPosts={scheduledPosts}
              onOpenNewPost={() => setIsNewPostOpen(true)}
              onOpenCarouselSprint={() => setIsCarouselSprintOpen(true)}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView competitors={competitors} onExportCSV={handleExportCSV} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              competitors={competitors}
              trackedCount={competitors.length}
              maxTrackedCount={10}
              onRemoveCompetitor={handleRemoveCompetitor}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <AddCompetitorModal
        isOpen={isAddCompetitorOpen}
        onClose={() => setIsAddCompetitorOpen(false)}
        onAddCompetitor={handleAddCompetitor}
      />

      <CompetitorDetailModal
        competitor={selectedCompetitorDetail}
        userBrand={userBrand}
        isOpen={!!selectedCompetitorDetail}
        onClose={() => setSelectedCompetitorDetail(null)}
        onRemoveCompetitor={handleRemoveCompetitor}
      />

      <CarouselSprintModal
        isOpen={isCarouselSprintOpen}
        onClose={() => setIsCarouselSprintOpen(false)}
        onScheduleSprint={handleSchedulePost}
      />

      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSavePost={handleSchedulePost}
      />

      <IntelligencePlaybookModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        competitors={competitors}
        onSelectCompetitor={(comp) => {
          setSelectedCompetitorDetail(comp);
        }}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenNewPost={() => setIsNewPostOpen(true)}
        onOpenAddCompetitor={() => setIsAddCompetitorOpen(true)}
        onExportCSV={handleExportCSV}
      />
    </div>
  );
}
