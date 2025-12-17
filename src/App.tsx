import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import {
  HomePage,
  SearchPage,
  NotificationsPage,
  MessagesPage,
  ProfilePage,
  SettingsPage,
  PostPage,
  ContentWarningPage,
} from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="messages/:username" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="profile/edit" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/:section" element={<SettingsPage />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="content-warning" element={<ContentWarningPage />} />
          <Route path="tag/:tag" element={<SearchPage />} />
          <Route path="followers" element={<ProfilePage />} />
          <Route path="following" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
