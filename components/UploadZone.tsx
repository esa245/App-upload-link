
import React, { useRef } from 'react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div 
      onClick={!isLoading ? handleClick : undefined}
      className={`
        relative group border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
        ${isLoading ? 'border-orange-200 bg-orange-50' : 'border-gray-200 hover:border-orange-500 hover:bg-orange-50/30 cursor-pointer'}
      `}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
        accept=".apk,.ipa,.zip"
      />
      
      <div className="flex flex-col items-center">
        <div className={`
          w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110
          ${isLoading ? 'bg-orange-100 text-orange-500 animate-pulse' : 'bg-gray-100 text-gray-400 group-hover:bg-orange-500 group-hover:text-white'}
        `}>
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isLoading ? 'Processing your app...' : 'Drop your app file here'}
        </h3>
        <p className="text-gray-500 mb-1">
          {isLoading ? 'Wait a moment while we set things up' : 'Supports .apk, .ipa and .zip files'}
        </p>
        <p className="text-xs text-gray-400 font-medium">Max file size: 2GB</p>
      </div>

      {isLoading && (
        <div className="absolute inset-x-0 bottom-0 px-12 pb-8">
          <div className="w-full bg-orange-100 h-2 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default UploadZone;
