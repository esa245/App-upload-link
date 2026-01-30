
import React, { useState } from 'react';
import { AnalysisResult, AppMetadata } from '../types';

interface ResultViewProps {
  metadata: AppMetadata;
  analysis: AnalysisResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ metadata, analysis, onReset }) => {
  const [copied, setCopied] = useState(false);
  const shareLink = `https://apponthego.io/d/${Math.random().toString(36).substring(7)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Success Header */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 flex items-center gap-6">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shrink-0">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upload Complete!</h2>
          <p className="text-emerald-700">Your app is live and ready for distribution.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Metadata & AI Analysis */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">AI Smart Analysis</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                   AI Generated Release Notes
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{analysis.releaseNotes}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Security Audit</h4>
                  <p className="text-gray-700 text-sm font-medium">{analysis.securitySummary}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Marketing Pitch</h4>
                  <p className="text-gray-700 text-sm font-medium italic">"{analysis.marketingCopy}"</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">File Info</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div>
                 <span className="block text-xs text-gray-400 mb-1">Filename</span>
                 <span className="font-medium text-gray-900 text-sm truncate block">{metadata.name}</span>
               </div>
               <div>
                 <span className="block text-xs text-gray-400 mb-1">Size</span>
                 <span className="font-medium text-gray-900 text-sm">{metadata.size}</span>
               </div>
               <div>
                 <span className="block text-xs text-gray-400 mb-1">Platform</span>
                 <span className="font-medium text-gray-900 text-sm uppercase">{metadata.type.replace('.', '')}</span>
               </div>
               <div>
                 <span className="block text-xs text-gray-400 mb-1">Uploaded</span>
                 <span className="font-medium text-gray-900 text-sm">{metadata.uploadDate}</span>
               </div>
            </div>
          </section>
        </div>

        {/* Right Column: Share & Actions */}
        <div className="space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Public Link</h3>
            <div className="space-y-4">
              <div className="relative group">
                <input 
                  type="text" 
                  readOnly 
                  value={shareLink}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button 
                  onClick={handleCopy}
                  className="absolute right-2 top-1.5 p-2 bg-white text-gray-500 hover:text-orange-500 rounded-lg shadow-sm border border-gray-100 transition-colors"
                >
                  {copied ? (
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="aspect-square bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100">
                <div className="w-32 h-32 bg-gray-200 rounded animate-pulse flex items-center justify-center text-gray-400">
                  QR CODE
                </div>
                <p className="mt-4 text-xs font-medium text-gray-400 text-center uppercase tracking-wider">Scan to download</p>
              </div>
            </div>
          </section>
          
          <button 
            onClick={onReset}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Upload Another App
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
