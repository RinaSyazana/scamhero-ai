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
  mediaUrls: string[];
  verificationStatus: 'Verified' | 'Unverified' | 'Awaiting Review';
  likes: number;
  dislikes: number;
}
