import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Notification {
  id: number;
  name: string;
  username: string;
  avatar: string;
  action: string;
  time: string;
  actionIcon: 'heart' | 'follow' | 'comment' | 'mention';
  isRead: boolean;
  postPreview?: string;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    username: 'alexjohnson',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    action: 'liked your post',
    time: '2m ago',
    actionIcon: 'heart',
    isRead: false,
    postPreview: 'Exploring minimal UI with neon edges...',
  },
  {
    id: 2,
    name: 'Sam and 12 others',
    username: 'sam',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    action: 'liked your photo',
    time: '10m ago',
    actionIcon: 'heart',
    isRead: false,
  },
  {
    id: 3,
    name: 'Jessica Kim',
    username: 'jessicakim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    action: 'commented on your post',
    time: '25m ago',
    actionIcon: 'comment',
    isRead: false,
    postPreview: 'This is amazing! Love the aesthetic 💜',
  },
  {
    id: 4,
    name: 'James Wilson',
    username: 'jameswilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    action: 'sent you a follow request',
    time: '1h ago',
    actionIcon: 'follow',
    isRead: true,
  },
  {
    id: 5,
    name: 'Lisa Barnett',
    username: 'lisabarnett',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    action: 'started following you',
    time: '2h ago',
    actionIcon: 'follow',
    isRead: true,
  },
  {
    id: 6,
    name: 'Maya Patel',
    username: 'mayapatel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    action: 'mentioned you in a comment',
    time: '3h ago',
    actionIcon: 'mention',
    isRead: true,
    postPreview: '@alexjohnson check this out!',
  },
  {
    id: 7,
    name: 'David Lee',
    username: 'davidlee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    action: 'liked your comment',
    time: '5h ago',
    actionIcon: 'heart',
    isRead: true,
  },
];

type FilterType = 'all' | 'unread' | 'likes' | 'follows' | 'comments';

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [notifications, setNotifications] = useState(notificationsData);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    if (filter === 'likes') return n.actionIcon === 'heart';
    if (filter === 'follows') return n.actionIcon === 'follow';
    if (filter === 'comments') return n.actionIcon === 'comment' || n.actionIcon === 'mention';
    return true;
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getActionIcon = (type: Notification['actionIcon']) => {
    switch (type) {
      case 'heart':
        return (
          <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        );
      case 'follow':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'mention':
        return (
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        );
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-purple-400 text-sm mt-1">{unreadCount} unread notifications</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {(['all', 'unread', 'likes', 'follows', 'comments'] as FilterType[]).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap ${
              filter === filterType
                ? 'tab-active text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="glass-card divide-y divide-purple-500/10">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-gray-400">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <Link
              key={notification.id}
              to={`/profile/${notification.username}`}
              className={`flex items-start gap-4 p-4 hover:bg-white/5 transition-colors ${
                !notification.isRead ? 'bg-purple-500/5' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="avatar-ring-gradient">
                  <img
                    src={notification.avatar}
                    alt={notification.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  {getActionIcon(notification.actionIcon)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-white text-sm">
                      <span className="font-semibold">{notification.name}</span>{' '}
                      <span className="text-gray-400">{notification.action}</span>
                    </p>
                    {notification.postPreview && (
                      <p className="text-gray-500 text-sm mt-1 truncate">"{notification.postPreview}"</p>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">{notification.time}</span>
                </div>
                {notification.actionIcon === 'follow' && notification.action.includes('request') && (
                  <div className="flex gap-2 mt-3">
                    <button className="btn-primary px-4 py-1.5 rounded-lg text-sm font-medium text-white">
                      Accept
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-gray-700/50 hover:bg-gray-700 transition-colors">
                      Decline
                    </button>
                  </div>
                )}
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-2" />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

