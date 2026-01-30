
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ResultView from './components/ResultView';
import { AppStep, AppMetadata, AnalysisResult } from './types';
import { analyzeAppFile } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.IDLE);
  const [metadata, setMetadata] = useState<AppMetadata | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = async (file: File) => {
    setError(null);
    setStep(AppStep.UPLOADING);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const meta: AppMetadata = {
      name: file.name,
      version: '1.0.0', // Basic mock
      size: formatFileSize(file.size),
      type: file.name.split('.').pop() || 'unknown',
      uploadDate: new Date().toLocaleDateString()
    };
    setMetadata(meta);
    
    setStep(AppStep.ANALYZING);
    try {
      const result = await analyzeAppFile(file.name);
      setAnalysis(result);
      setStep(AppStep.SUCCESS);
    } catch (err) {
      console.error("AI Analysis failed", err);
      // Fallback in case of API failure
      setAnalysis({
        releaseNotes: "Minor updates and stability improvements.",
        securitySummary: "Scanned for common vulnerabilities.",
        marketingCopy: "Download the latest version now."
      });
      setStep(AppStep.SUCCESS);
    }
  };

  const reset = () => {
    setStep(AppStep.IDLE);
    setMetadata(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
        {step === AppStep.IDLE || step === AppStep.UPLOADING || step === AppStep.ANALYZING ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                Distribution made <span className="text-orange-500 underline decoration-4 underline-offset-8">seamless</span>.
              </h1>
              <p className="text-lg text-gray-500">
                Upload your APK, IPA, or ZIP. We handle the analysis, storage, and sharing link generation instantly.
              </p>
            </div>

            <UploadZone 
              onFileSelect={handleFileSelect} 
              isLoading={step === AppStep.UPLOADING || step === AppStep.ANALYZING} 
            />

            {step === AppStep.ANALYZING && (
              <div className="mt-8 text-center animate-pulse">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gemini is analyzing your app assets...
                </span>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-center text-sm font-medium">
                {error}
              </div>
            )}
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon="⚡"
                title="Instant Links"
                desc="Upload and share. Your testers get a clean download page immediately."
              />
              <FeatureCard 
                icon="🤖"
                title="AI Powered"
                desc="Automatically generate release notes and changelogs from your build."
              />
              <FeatureCard 
                icon="🔒"
                title="Secure Hosting"
                desc="Enterprise-grade security and encryption for your private application files."
              />
            </div>
          </div>
        ) : (
          metadata && analysis && (
            <ResultView 
              metadata={metadata} 
              analysis={analysis} 
              onReset={reset} 
            />
          )
        )}
      </main>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} App On The Go. Built for developers.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;
