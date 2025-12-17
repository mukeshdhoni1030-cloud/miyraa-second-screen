import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostActionsModal from '../components/PostActionsModal';

interface Story {
  id: number;
  name: string;
  avatar: string;
  isYourStory?: boolean;
  hasNewStory?: boolean;
}

interface Post {
  id: number;
  author: string;
  username: string;
  avatar: string;
  content: string;
  initial: string;
  likes: number;
  comments: number;
  time: string;
  isSensitive?: boolean;
}

const stories: Story[] = [
  { id: 1, name: 'Your Story', avatar: '', isYourStory: true },
  { id: 2, name: 'Alex', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', hasNewStory: true },
  { id: 3, name: 'Maya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', hasNewStory: true },
  { id: 4, name: 'John', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', hasNewStory: true },
  { id: 5, name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', hasNewStory: false },
  { id: 6, name: 'Mike', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', hasNewStory: true },
];

const posts: Post[] = [
  {
    id: 1,
    author: 'Alex Johnson',
    username: '@alexjohnson',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    content: 'Exploring minimal UI with neon edges. Clean design feels powerful. What do you think about this aesthetic? 🎨✨',
    initial: 'A',
    likes: 234,
    comments: 45,
    time: '2h ago',
  },
  {
    id: 2,
    author: "Maya Patel",
    username: '@mayapatel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: "Design is not decoration. It's communication. Every pixel should have a purpose. 💜",
    initial: 'M',
    likes: 189,
    comments: 32,
    time: '4h ago',
  },
  {
    id: 3,
    author: "David Lee",
    username: '@davidlee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: "Just finished a new project using glassmorphism. The depth it creates is incredible!",
    initial: 'D',
    likes: 421,
    comments: 67,
    time: '6h ago',
    isSensitive: true,
  },
  {
    id: 4,
    author: "Jessica Kim",
    username: '@jessicakim',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: "The future of UI is dark mode with vibrant accents. Change my mind! 🌙",
    initial: 'J',
    likes: 567,
    comments: 89,
    time: '8h ago',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  const handlePostClick = (post: Post) => {
    if (post.isSensitive) {
      navigate('/content-warning', { state: { postId: post.id } });
    } else {
      navigate(`/post/${post.id}`);
    }
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Home</h1>
        <Link
          to="/search"
          className="search-input flex items-center gap-2 text-sm text-gray-400 px-4 py-2.5 hover:border-purple-500/50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </Link>
      </div>

      {/* Stories Section */}
      <div className="glass-card p-4 mb-6">
        <h2 className="text-sm font-medium text-gray-300 mb-4">Stories</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {stories.map((story) => (
            <button
              key={story.id}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className={`${story.isYourStory ? 'border-2 border-dashed border-purple-500/50' : story.hasNewStory ? 'story-ring' : 'border-2 border-gray-600/50'} rounded-full p-0.5 transition-transform group-hover:scale-105`}>
                <div className="story-ring-inner w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                  {story.isYourStory ? (
                    <div className="w-full h-full bg-dark-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  ) : (
                    <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{story.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="avatar-ring-gradient flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
          />
          <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white">
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="post-card p-5 glass-card-hover transition-all cursor-pointer">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <Link to={`/profile/${post.username.slice(1)}`} className="flex items-center gap-3 group">
                <div className="avatar-ring-gradient">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium group-hover:text-purple-400 transition-colors">{post.author}</p>
                  <p className="text-gray-500 text-sm">{post.username} · {post.time}</p>
                </div>
              </Link>
              <button
                onClick={() => setSelectedPost(post)}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="18" r="1.5" />
                </svg>
              </button>
            </div>

            {/* Post Content */}
            <div onClick={() => handlePostClick(post)}>
              <p className="text-gray-200 leading-relaxed mb-4">{post.content}</p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
              <div className="flex gap-6">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    likedPosts.has(post.id) ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => toggleSave(post.id)}
                className={`transition-colors ${
                  savedPosts.has(post.id) ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'
                }`}
              >
                <svg className="w-5 h-5" fill={savedPosts.has(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Post Actions Modal */}
      {selectedPost && (
        <PostActionsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={() => toggleLike(selectedPost.id)}
          onSave={() => toggleSave(selectedPost.id)}
          isLiked={likedPosts.has(selectedPost.id)}
          isSaved={savedPosts.has(selectedPost.id)}
        />
      )}
    </div>
  );
};

export default HomePage;

