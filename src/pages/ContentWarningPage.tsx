import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ContentWarningPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state?.postId || 1;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSeePost = () => {
    navigate(`/post/${postId}`, { state: { bypassWarning: true } });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="glass-card warning-overlay p-8 lg:p-12 w-full max-w-md text-center">
        {/* Warning Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 flex items-center justify-center animate-pulse-glow">
            <svg className="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
          This content may<br />be sensitive
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          This content may contain material that some viewers may find disturbing or offensive.
        </p>

        {/* Info Box */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-8">
          <p className="text-gray-300 text-sm">
            You can change your content preferences in{' '}
            <button
              onClick={() => navigate('/settings')}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Settings
            </button>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleGoBack}
            className="flex-1 py-3.5 rounded-xl text-gray-300 font-medium bg-dark-500/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-dark-500 transition-all"
          >
            Go back
          </button>
          <button
            onClick={handleSeePost}
            className="flex-1 py-3.5 rounded-xl text-white font-medium bg-gray-700/80 hover:bg-gray-600/80 transition-colors"
          >
            See post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentWarningPage;

