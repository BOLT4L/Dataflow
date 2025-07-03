import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Database, 
  Clock, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      name: 'Active Configurations',
      value: '12',
      change: '+2 this week',
      changeType: 'positive',
      icon: Database
    },
    {
      name: 'Total Data Points',
      value: '24,847',
      change: '+1,234 today',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      name: 'Next Scheduled Scrape',
      value: '2 hours',
      change: '3 configurations',
      changeType: 'neutral',
      icon: Clock
    },
    {
      name: 'Success Rate',
      value: '98.5%',
      change: '+0.3% this month',
      changeType: 'positive',
      icon: Activity
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'success',
      message: 'E-commerce Price Monitor completed successfully',
      time: '2 minutes ago',
      dataPoints: 156
    },
    {
      id: 2,
      type: 'success',
      message: 'Local Events Scraper completed successfully',
      time: '15 minutes ago',
      dataPoints: 23
    },
    {
      id: 3,
      type: 'error',
      message: 'Academic Papers Scraper failed - site structure changed',
      time: '1 hour ago',
      dataPoints: 0
    },
    {
      id: 4,
      type: 'success',
      message: 'Real Estate Listings completed successfully',
      time: '2 hours ago',
      dataPoints: 89
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      name: 'E-commerce Price Monitor',
      nextRun: 'In 2 hours',
      frequency: 'Every 6 hours'
    },
    {
      id: 2,
      name: 'Stock Market Data',
      nextRun: 'In 4 hours',
      frequency: 'Daily at 9 AM'
    },
    {
      id: 3,
      name: 'Local Events Scraper',
      nextRun: 'Tomorrow at 8 AM',
      frequency: 'Daily'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Hello!</h1>
        <p className="text-darktext mb-6">
          Your data collection is running smoothly. Here's what's happening with your configurations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard/configurations/new"
            className="inline-flex items-center gap-2 bg-secondary text-accent px-6 py-3 rounded-full font-semibold hover:bg-lovable-purple-700 transition-colors duration-300 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create New Configuration
          </Link>
          <Link
            to="/dashboard/data"
            className="inline-flex items-center gap-2 border-2 border-secondary text-darktext px-6 py-3 rounded-full font-semibold hover:bg-lovable-purple-800 transition-colors duration-300 shadow-md"
          >
            <Database className="w-5 h-5" />
            View All Data
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-darkcard p-6 rounded-xl border border-lovable-purple-900 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-lovable-yellow-300 mb-1">{stat.value}</p>
                <p className="text-darktext mb-2">{stat.name}</p>
                <p className={`text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-accent' :
                  stat.changeType === 'negative' ? 'text-primary' : 'text-darktext'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-darkcard rounded-xl border border-lovable-purple-900">
          <div className="p-6 border-b border-lovable-purple-900">
            <h2 className="text-xl font-semibold text-lovable-yellow-300">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-darkcard rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : activity.type === 'error' ? (
                      <XCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-darktext" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-darktext">{activity.message}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-darktext">{activity.time}</p>
                      {activity.dataPoints > 0 && (
                        <p className="text-xs text-primary font-medium">
                          {activity.dataPoints} data points collected
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/dashboard/configurations"
                className="text-primary hover:text-lovable-red-600 text-sm font-medium"
              >
                View all configurations →
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-darkcard rounded-xl border border-lovable-purple-900">
          <div className="p-6 border-b border-lovable-purple-900">
            <h2 className="text-xl font-semibold text-lovable-yellow-300">Upcoming Scrapes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-darkcard rounded-lg">
                  <div>
                    <p className="font-medium text-darktext">{task.name}</p>
                    <p className="text-sm text-lovable-purple-300">Next run: {task.nextRun}</p>
                  </div>
                  <span className="text-xs text-darktext bg-secondary/20 px-3 py-1 rounded-full">{task.frequency}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/dashboard/configurations"
                className="text-primary hover:text-lovable-red-600 text-sm font-medium"
              >
                Manage all configurations →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;