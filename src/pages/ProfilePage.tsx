import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  isOwn?: boolean;
}

interface Post {
  id: number;
  image: string;
  likes: number;
  comments: number;
}

const currentUser: UserProfile = {
  name: 'Alex Johnson',
  username: 'alexjohnson',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  bio: 'UI/UX Designer | Creating beautiful interfaces with neon aesthetics ✨',
  followers: 12500,
  following: 890,
  posts: 156,
  isOwn: true,
};

const userPosts: Post[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop', likes: 234, comments: 45 },
  { id: 2, image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop', likes: 189, comments: 32 },
  { id: 3, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', likes: 421, comments: 67 },
  { id: 4, image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop', likes: 567, comments: 89 },
  { id: 5, image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop', likes: 312, comments: 56 },
  { id: 6, image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400&h=400&fit=crop', likes: 445, comments: 78 },
  { id: 7, image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=400&fit=crop', likes: 298, comments: 41 },
  { id: 8, image: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400&h=400&fit=crop', likes: 523, comments: 92 },
  { id: 9, image: 'https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=400&h=400&fit=crop', likes: 178, comments: 23 },
];

type TabType = 'posts' | 'saved' | 'tagged';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  
  // For demo purposes, show current user if no username or if it matches
  const isOwnProfile = !username || username === currentUser.username;
  const profile = currentUser;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-card p-6 lg:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="story-ring p-1">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover"
              />
            </div>
            {isOwnProfile && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-2 border-dark-800">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{profile.name}</h1>
              {isOwnProfile ? (
                <div className="flex gap-2">
                  <Link
                    to="/profile/edit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-700/80 rounded-lg hover:bg-gray-600/80 transition-colors"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="p-2 text-gray-400 hover:text-white bg-gray-700/80 rounded-lg hover:bg-gray-600/80 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                      isFollowing
                        ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30'
                        : 'btn-primary text-white'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700/80 rounded-lg hover:bg-gray-600/80 transition-colors">
                    Message
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-400 mb-2">@{profile.username}</p>
            <p className="text-gray-300 mb-4 max-w-md">{profile.bio}</p>

            {/* Stats */}
            <div className="flex justify-center sm:justify-start gap-8">
              <div className="text-center sm:text-left">
                <p className="text-xl font-bold text-white">{formatNumber(profile.posts)}</p>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>
              <Link to="/followers" className="text-center sm:text-left hover:opacity-80 transition-opacity">
                <p className="text-xl font-bold text-white">{formatNumber(profile.followers)}</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </Link>
              <Link to="/following" className="text-center sm:text-left hover:opacity-80 transition-opacity">
                <p className="text-xl font-bold text-white">{formatNumber(profile.following)}</p>
                <p className="text-gray-500 text-sm">Following</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-purple-500/10 mb-6">
        {(['posts', 'saved', 'tagged'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-sm font-medium capitalize transition-all relative ${
              activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
        {userPosts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="aspect-square rounded-xl overflow-hidden group relative"
          >
            <img
              src={post.image}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="font-medium">{post.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-medium">{post.comments}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;

