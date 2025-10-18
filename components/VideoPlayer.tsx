import React, { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string | null;
  file: File | null;
  onClear: () => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const ClearIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MagicWandIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l-1.5 1.5M11 3l-1.5 1.5m-3.5 10l-1.5 1.5M17 9l-1.5 1.5" />
  </svg>
);

const SpinnerIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={`${className} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const RestoreAudioIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);


export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, file, onClear }) => {
  if (!src || !file) {
    return (
        <div className="text-center py-10">
            <p className="text-slate-400">No video selected.</p>
        </div>
    );
  }

  const [isProcessing, setIsProcessing] = useState(false);
  const [isInstrumental, setIsInstrumental] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isInstrumental;
    }
  }, [isInstrumental]);

  const handleInstrumentalClick = () => {
    if (isInstrumental) {
      setIsInstrumental(false);
    } else {
      setIsProcessing(true);
      // Simulate processing time for vocal removal
      setTimeout(() => {
        setIsProcessing(false);
        setIsInstrumental(true);
      }, 2500);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-black/50 border border-slate-700/80 rounded-lg mb-4 shadow-lg overflow-hidden">
        <video 
            ref={videoRef}
            src={src} 
            controls 
            autoPlay 
            loop
            className="w-full aspect-video"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-slate-800/70 border border-slate-700 p-3 rounded-lg">
        <div className="text-sm text-slate-300 mb-3 sm:mb-0 text-center sm:text-left">
            <p className="font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md" title={file.name}>{file.name}</p>
            <p className="text-slate-400">{formatBytes(file.size)}</p>
        </div>

        <div className="flex items-center space-x-3">
            <button
              onClick={handleInstrumentalClick}
              disabled={isProcessing}
              className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed ${
                isInstrumental
                  ? 'bg-transparent text-green-400 border border-green-500/50 hover:bg-green-500/10 hover:text-green-300 focus-visible:ring-green-500'
                  : 'bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30 hover:text-sky-200 focus-visible:ring-sky-500'
              }`}
            >
              {isProcessing ? (
                <SpinnerIcon className="w-5 h-5 mr-2" />
              ) : isInstrumental ? (
                <RestoreAudioIcon className="w-5 h-5 mr-2" />
              ) : (
                <MagicWandIcon className="w-5 h-5 mr-2" />
              )}
              {isProcessing ? 'Processing...' : isInstrumental ? 'Restore Audio' : 'Create Instrumental'}
            </button>
            <button
              onClick={onClear}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-transparent text-red-400 border border-red-500/50 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
            >
              <ClearIcon className="w-5 h-5 mr-2" />
              Clear Video
            </button>
        </div>
      </div>
    </div>
  );
};
