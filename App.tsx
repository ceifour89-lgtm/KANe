import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SettingsPage } from './components/SettingsPage';
import { Footer } from './components/Footer';
import { useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import { InviteFriendsPage } from './components/InviteFriendsPage';
import { SupportPage } from './components/SupportPage';

export type Page = 'home' | 'settings' | 'inviteFriends' | 'support';

const App: React.FC = () => {
  const { user } = useAuth();
  const [page, setPage] = useState<Page>('home');

  // Audio state
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  // Video state
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleAudioSelect = useCallback((file: File) => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioFile(file);
    const newUrl = URL.createObjectURL(file);
    setAudioUrl(newUrl);
  }, [audioUrl]);

  const handleClearAudio = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioFile(null);
    setAudioUrl(null);
  }, [audioUrl]);

  const handleVideoSelect = useCallback((file: File) => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoFile(file);
    const newUrl = URL.createObjectURL(file);
    setVideoUrl(newUrl);
  }, [videoUrl]);

  const handleClearVideo = useCallback(() => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoFile(null);
    setVideoUrl(null);
  }, [videoUrl]);

  useEffect(() => {
    // Cleanup URL objects on component unmount
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [audioUrl, videoUrl]);

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (page) {
      case 'settings':
        return <SettingsPage />;
      case 'inviteFriends':
        return <InviteFriendsPage />;
      case 'support':
        return <SupportPage />;
      case 'home':
      default:
        return (
          <HomePage
            audioFile={audioFile}
            audioUrl={audioUrl}
            onAudioSelect={handleAudioSelect}
            onClearAudio={handleClearAudio}
            videoFile={videoFile}
            videoUrl={videoUrl}
            onVideoSelect={handleVideoSelect}
            onClearVideo={handleClearVideo}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <Header currentPage={page} onNavigate={setPage} />
        <main className="w-full">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
