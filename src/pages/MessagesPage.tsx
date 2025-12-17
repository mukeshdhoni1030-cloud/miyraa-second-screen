import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Conversation {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Maya Patel',
    username: 'mayapatel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'That design looks amazing! Can you share the Figma file?',
    time: '2m ago',
    unread: 2,
    isOnline: true,
  },
  {
    id: 2,
    name: 'David Lee',
    username: 'davidlee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Sure, I will send it over tomorrow morning',
    time: '1h ago',
    unread: 0,
    isOnline: true,
  },
  {
    id: 3,
    name: 'Jessica Kim',
    username: 'jessicakim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'Thanks for the feedback! 💜',
    time: '3h ago',
    unread: 0,
    isOnline: false,
  },
  {
    id: 4,
    name: 'James Wilson',
    username: 'jameswilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    lastMessage: 'Let me know when you are free for a call',
    time: '1d ago',
    unread: 1,
    isOnline: false,
  },
  {
    id: 5,
    name: 'Sarah Chen',
    username: 'sarahchen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    lastMessage: 'The project is coming along nicely!',
    time: '2d ago',
    unread: 0,
    isOnline: true,
  },
];

const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Messages</h1>
        <button className="p-2.5 glass-card hover:border-purple-500/50 transition-colors">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages..."
          className="search-input w-full pl-12 pr-4 py-3"
        />
      </div>

      {/* Online Now */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-400 mb-3">Online Now</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {conversations.filter(c => c.isOnline).map(conv => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className="relative">
                <div className="story-ring p-0.5">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-800" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors truncate max-w-[60px]">
                {conv.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="glass-card divide-y divide-purple-500/10">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-400">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <Link
              key={conv.id}
              to={`/messages/${conv.username}`}
              className={`flex items-center gap-4 p-4 hover:bg-white/5 transition-colors ${
                conv.unread > 0 ? 'bg-purple-500/5' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="avatar-ring-gradient">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                {conv.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-800" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-medium truncate ${conv.unread > 0 ? 'text-white' : 'text-gray-300'}`}>
                    {conv.name}
                  </p>
                  <span className="text-gray-500 text-xs flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-300' : 'text-gray-500'}`}>
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">{conv.unread}</span>
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

