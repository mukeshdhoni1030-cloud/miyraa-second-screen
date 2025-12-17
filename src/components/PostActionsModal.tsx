import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  author: string;
  username?: string;
}

interface PostActionsModalProps {
  post: Post;
  onClose: () => void;
  onLike: () => void;
  onSave: () => void;
  isLiked: boolean;
  isSaved: boolean;
}

const PostActionsModal: React.FC<PostActionsModalProps> = ({
  post,
  onClose,
  onLike,
  onSave,
  isLiked,
  isSaved,
}) => {
  const navigate = useNavigate();

  const handleViewPost = () => {
    onClose();
    navigate(`/post/${post.id}`);
  };

  const handleViewProfile = () => {
    onClose();
    navigate(`/profile/${post.username || 'user'}`);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard?.writeText(`${window.location.origin}/post/${post.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="glass-card p-6 w-full max-w-sm relative z-10 animate-float">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-white">Post Quick Actions</h2>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <button
            onClick={() => { onLike(); onClose(); }}
            className="action-btn w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3"
          >
            <svg className={`w-5 h-5 ${isLiked ? 'text-pink-500' : 'text-pink-400'}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-white font-medium">{isLiked ? 'Unlike' : 'Like'}</span>
          </button>

          <button
            onClick={() => { onSave(); onClose(); }}
            className="action-btn w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3"
          >
            <svg className={`w-5 h-5 ${isSaved ? 'text-purple-400' : 'text-gray-300'}`} fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="text-white font-medium">{isSaved ? 'Unsave' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="action-btn w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-white font-medium">Share</span>
          </button>

          <button
            onClick={handleViewPost}
            className="action-btn w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-white font-medium">View Post</span>
          </button>

          <button
            onClick={handleViewProfile}
            className="action-btn w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-white font-medium">View Profile</span>
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl text-gray-400 font-medium text-sm bg-dark-500/50 hover:bg-dark-500 transition-colors border border-transparent hover:border-purple-500/20"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostActionsModal;

