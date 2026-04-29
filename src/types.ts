export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Locked';
export type Difficulty = 'Easy' | 'Moderate' | 'Hard';

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  timeEstimate: string;
  status: TaskStatus;
  category: 'Before Arrival' | 'First Week' | 'First Month' | 'Ongoing';
  icon: string;
  dependsOn?: string[];
  importance: 'Critical' | 'High' | 'Moderate';
  cost: string;
}

export interface UserProfile {
  name: string;
  nationality: string;
  university: string;
  arrivalDate: string;
  city: string;
  motivation: string;
  language: 'English' | 'Portuguese' | 'Spanish';
  isOnboarded: boolean;
  visaStatus?: string;
  gender?: string;
  email?: string;
}

export interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  link: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  description: string;
  matchType?: 'Same University' | 'Same Arrival' | 'Same Nationality';
}
