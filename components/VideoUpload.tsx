import React, { useRef, useState } from 'react';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
}

const VideoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);


export const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = (file: File | undefined) => {
    if (!file) {
      return;
    }
    
    if (!file.type.startsWith('video/')) {
      setError('Invalid file type. Please upload a video file.');
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
      return;
    }
    
    setError(null);
    onVideoSelect(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files?.[0]);
  };

  const handleClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); // This is necessary to allow for a drop event
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    processFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <label
            htmlFor="video-upload"
            className={`group w-full h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-sky-400 bg-slate-800/80' : error ? 'border-red-500/80 bg-red-500/10' : 'border-slate-700 hover:border-sky-500 hover:bg-slate-800'}`}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <VideoIcon />
                <p className="my-2 text-base text-slate-400">
                    <>
                      <span className="font-semibold text-sky-400">Click to upload</span>
                      <span className="block text-sm">or drag and drop video file</span>
                    </>
                </p>
                <p className="text-xs text-slate-500">MP4, WebM, OGG, etc.</p>
            </div>
            <input 
                id="video-upload" 
                ref={fileInputRef} 
                type="file" 
                accept="video/*" 
                className="hidden" 
                onChange={handleFileChange} 
            />
        </label>
        {error && <p className="mt-4 text-center text-red-400">{error}</p>}
    </div>
  );
};
