
export enum MembershipTier {
  BASIC = 'BASIC',
  ENLIGHTENED = 'ENLIGHTENED', // $10 - Instant reply
  SAGE = 'SAGE', // $50 - Phone/WhatsApp
  TRAINEE = 'TRAINEE' // $100 - Mystic Training
}

export type QuestionCategory = 'DREAM' | 'SPIRITUAL_EXPERIENCE' | 'SPIRITUAL_SYNDROME' | 'MYSTICAL_TRAINING';

export interface Message {
  id: string;
  sender: 'user' | 'admin' | 'system';
  text: string;
  timestamp: Date;
  translatedText?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface ChatThread {
  id: string;
  title: string;
  category: QuestionCategory;
  messages: Message[];
  status: 'PENDING' | 'ADMIN_DELAY' | 'ACTIVE' | 'RESOLVED';
  createdAt: Date;
  tierAtTime: MembershipTier;
}

export interface UserProfile {
  name: string;
  email: string;
  tier: MembershipTier;
  avatar?: string;
  bio?: string;
  location?: string;
  trainingProgress?: number; // 0-100 for trainees
}
