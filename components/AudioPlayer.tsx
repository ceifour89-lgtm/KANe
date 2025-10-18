import React from 'react';

interface AudioPlayerProps {
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


export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, file, onClear }) => {
  if (!src || !file) {
    return (
        <div className="text-center py-10">
            <p className="text-slate-400">No audio selected.</p>
        </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-slate-900/70 border border-slate-700/80 rounded-lg p-4 mb-4 shadow-lg">
        <audio 
            src={src} 
            controls 
            autoPlay 
            loop
            className="w-full"
        >
          Your browser does not support the audio tag.
        </audio>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-slate-800/70 border border-slate-700 p-3 rounded-lg">
        <div className="text-sm text-slate-300 mb-2 sm:mb-0 text-center sm:text-left">
            <p className="font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md" title={file.name}>{file.name}</p>
            <p className="text-slate-400">{formatBytes(file.size)}</p>
        </div>
        <button
          onClick={onClear}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-transparent text-red-400 border border-red-500/50 rounded-md hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
        >
          <ClearIcon className="w-5 h-5 mr-2" />
          Clear Audio
        </button>
      </div>
    </div>
  );
};