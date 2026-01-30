
export interface AppMetadata {
  name: string;
  version: string;
  size: string;
  type: string;
  uploadDate: string;
}

export interface AnalysisResult {
  releaseNotes: string;
  securitySummary: string;
  marketingCopy: string;
}

export enum AppStep {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS'
}
