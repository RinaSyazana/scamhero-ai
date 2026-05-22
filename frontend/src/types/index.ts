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
