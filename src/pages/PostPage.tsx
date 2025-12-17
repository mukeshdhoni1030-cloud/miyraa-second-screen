import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Comment {
  id: number;
  author: string;
  username: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Mock post data
  const post = {
    id: Number(id),
    author: 'Alex Johnson',
    username: 'alexjohnson',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=800&fit=crop',
    content: 'Exploring minimal UI with neon edges. Clean design feels powerful. What do you think about this aesthetic? 🎨✨',
    likes: 234,
    time: '2h ago',
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: 'Maya Patel',
      username: 'mayapatel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      content: 'This is absolutely stunning! Love the color palette 💜',
      time: '1h ago',
      likes: 12,
    },
    {
      id: 2,
      author: 'David Lee',
      username: 'davidlee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      content: 'The gradient work here is incredible. Mind sharing your process?',
      time: '45m ago',
      likes: 8,
    },
    {
      id: 3,
      author: 'Jessica Kim',
      username: 'jessicakim',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      content: 'Definitely saving this for inspiration! 🔥',
      time: '30m ago',
      likes: 5,
    },
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, this would send to an API
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Post Image */}
        <div className="glass-card overflow-hidden">
          <img
            src={post.image}
            alt="Post"
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Post Details */}
        <div className="glass-card p-5 flex flex-col">
          {/* Author */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-purple-500/10">
            <Link to={`/profile/${post.username}`} className="flex items-center gap-3 group">
              <div className="avatar-ring-gradient">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium group-hover:text-purple-400 transition-colors">{post.author}</p>
                <p className="text-gray-500 text-sm">@{post.username}</p>
              </div>
            </Link>
            <button className="text-gray-400 hover:text-white transition-colors p-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>

          {/* Caption */}
          <p className="text-gray-200 mb-4">{post.content}</p>
          <p className="text-gray-500 text-sm mb-4">{post.time}</p>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-64 scrollbar-hide">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Link to={`/profile/${comment.username}`}>
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link to={`/profile/${comment.username}`} className="text-white font-medium text-sm hover:text-purple-400 transition-colors">
                      {comment.author}
                    </Link>
                    <span className="text-gray-500 text-xs">{comment.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <button className="text-gray-500 text-xs hover:text-pink-400 transition-colors">
                      {comment.likes} likes
                    </button>
                    <button className="text-gray-500 text-xs hover:text-purple-400 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="border-t border-purple-500/10 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'}`}
                >
                  <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-colors ${isSaved ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'}`}
              >
                <svg className="w-6 h-6" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>

            <p className="text-white font-medium text-sm mb-4">
              {post.likes + (isLiked ? 1 : 0)} likes
            </p>

            {/* Add Comment */}
            <form onSubmit={handleSubmitComment} className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="text-purple-400 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-purple-300 transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

