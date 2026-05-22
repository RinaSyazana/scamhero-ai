export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface ScamReport {
  id: string;
  title: string;
  description: string;
  platform: string;
  location: string;
  amountLost?: number;
  mediaUrls: string[];
  verificationStatus: 'Verified' | 'Unverified' | 'Awaiting Review' | 'Published';
  likes: number;
  dislikes: number;
  createdAt: string;
  reportedBy: {
    username: string;
    avatarUrl: string;
  };
}

export interface RuleReason {
  description: string;
  type: 'scam' | 'safe';
  impact: number;
}

export interface PredictResponse {
  label: 'SCAM' | 'SAFE';
  confidence: number;
  ai_prob: number;
  rule_score: number;
  reasons: RuleReason[];
}

export interface PredictImageResponse extends PredictResponse {
  extracted_text: string;
}

export interface ScanHistoryItem {
  id: string;
  message: string;
  label: 'SCAM' | 'SAFE';
  confidence: number;
  timestamp: string;
}

