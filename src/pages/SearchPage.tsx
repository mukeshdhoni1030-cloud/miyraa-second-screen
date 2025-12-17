import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type TabType = 'Top' | 'Posts' | 'People' | 'Tags';

interface Person {
  id: number;
  name: string;
  username: string;
  role: string;
  avatar: string;
  isFollowing?: boolean;
}

interface SearchResult {
  id: number;
  image: string;
  title: string;
}

const tabs: TabType[] = ['Top', 'Posts', 'People', 'Tags'];

const searchImages: SearchResult[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=300&fit=crop', title: 'Gradient 1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop', title: 'Abstract' },
  { id: 3, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop', title: 'Waves' },
  { id: 4, image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop', title: 'Neon' },
  { id: 5, image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=300&h=300&fit=crop', title: 'Colors' },
  { id: 6, image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=300&h=300&fit=crop', title: 'Art' },
  { id: 7, image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=300&h=300&fit=crop', title: 'Purple' },
  { id: 8, image: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=300&h=300&fit=crop', title: 'Modern' },
  { id: 9, image: 'https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=300&h=300&fit=crop', title: 'Design' },
  { id: 10, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop', title: 'Retro' },
  { id: 11, image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&h=300&fit=crop', title: 'Neon City' },
  { id: 12, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=300&fit=crop', title: 'Mountains' },
];

const people: Person[] = [
  {
    id: 1,
    name: 'Maya Patel',
    username: 'mayapatel',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isFollowing: false,
  },
  {
    id: 2,
    name: 'David Lee',
    username: 'davidlee',
    role: 'Graphic Artist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    isFollowing: false,
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    username: 'sarahwilson',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isFollowing: true,
  },
  {
    id: 4,
    name: 'James Chen',
    username: 'jameschen',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    isFollowing: false,
  },
];

const trendingTags = [
  { tag: 'design', posts: '12.5k' },
  { tag: 'ui', posts: '8.2k' },
  { tag: 'neon', posts: '5.1k' },
  { tag: 'darkmode', posts: '3.8k' },
  { tag: 'glassmorphism', posts: '2.9k' },
];

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Top');
  const [searchQuery, setSearchQuery] = useState('');
  const [followingState, setFollowingState] = useState<Record<number, boolean>>(
    people.reduce((acc, p) => ({ ...acc, [p.id]: p.isFollowing || false }), {})
  );

  const toggleFollow = (personId: number) => {
    setFollowingState(prev => ({ ...prev, [personId]: !prev[personId] }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">Search</h1>
        
        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for people, posts, tags..."
              className="search-input w-full pl-12 pr-4 py-3 text-sm lg:text-base"
            />
          </div>
          <button className="p-3 glass-card hover:border-purple-500/50 transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'tab-active text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      {(activeTab === 'Top' || activeTab === 'Posts') && (
        <div className="glass-card p-4 lg:p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            {activeTab === 'Top' ? 'Trending Posts' : 'Posts'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {searchImages.map((item) => (
              <Link
                key={item.id}
                to={`/post/${item.id}`}
                className="image-grid-item aspect-square cursor-pointer group relative"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-sm font-medium">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'Top' || activeTab === 'People') && (
        <div className="glass-card p-4 lg:p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">People</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {people.map((person) => (
              <div key={person.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                <Link to={`/profile/${person.username}`} className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="avatar-ring-gradient flex-shrink-0">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">{person.name}</p>
                    <p className="text-gray-500 text-xs truncate">@{person.username} · {person.role}</p>
                  </div>
                </Link>
                <button
                  onClick={() => toggleFollow(person.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex-shrink-0 ${
                    followingState[person.id]
                      ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30'
                      : 'bg-gray-700/80 text-white hover:bg-gray-600/80'
                  }`}
                >
                  {followingState[person.id] ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'Top' || activeTab === 'Tags') && (
        <div className="glass-card p-4 lg:p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Trending Tags</h2>
          <div className="space-y-3">
            {trendingTags.map((item, index) => (
              <Link
                key={item.tag}
                to={`/tag/${item.tag}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-purple-500/50 w-8">{index + 1}</span>
                  <div>
                    <p className="text-white font-medium group-hover:text-purple-400 transition-colors">#{item.tag}</p>
                    <p className="text-gray-500 text-sm">{item.posts} posts</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

