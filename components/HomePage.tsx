import React, { useState } from 'react';
import { AudioUpload } from './AudioUpload';
import { AudioPlayer } from './AudioPlayer';
import { VideoUpload } from './VideoUpload';
import { VideoPlayer } from './VideoPlayer';

interface HomePageProps {
  audioUrl: string | null;
  audioFile: File | null;
  onAudioSelect: (file: File) => void;
  onClearAudio: () => void;
  videoUrl: string | null;
  videoFile: File | null;
  onVideoSelect: (file: File) => void;
  onClearVideo: () => void;
}

const MediaTypeButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => {
    const baseClasses = "px-6 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded-md";
    const activeClasses = "bg-sky-500/20 text-sky-300";
    const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200";
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};


export const HomePage: React.FC<HomePageProps> = ({
  audioUrl,
  audioFile,
  onAudioSelect,
  onClearAudio,
  videoUrl,
  videoFile,
  onVideoSelect,
  onClearVideo,
}) => {
  const [mediaType, setMediaType] = useState<'audio' | 'video'>('audio');
  
  return (
    <>
      <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-2 p-1 bg-slate-800/70 border border-slate-700 rounded-lg">
              <MediaTypeButton onClick={() => setMediaType('audio')} isActive={mediaType === 'audio'}>
                  Audio
              </MediaTypeButton>
              <MediaTypeButton onClick={() => setMediaType('video')} isActive={mediaType === 'video'}>
                  Video
              </MediaTypeButton>
          </div>
      </div>
      <div className="w-full bg-slate-800/60 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-slate-700/80">
        {mediaType === 'audio' && (
          audioFile && audioUrl ? (
            <AudioPlayer file={audioFile} src={audioUrl} onClear={onClearAudio} />
          ) : (
            <AudioUpload onAudioSelect={onAudioSelect} />
          )
        )}
        {mediaType === 'video' && (
            videoFile && videoUrl ? (
                <VideoPlayer file={videoFile} src={videoUrl} onClear={onClearVideo} />
            ) : (
                <VideoUpload onVideoSelect={onVideoSelect} />
            )
        )}
      </div>
    </>
  );
};
