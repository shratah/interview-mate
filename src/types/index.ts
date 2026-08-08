export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  careerStage: CareerStage;
  careerPath: CareerPath;
  tools: string[];
  developmentLanguages: string[];
  skillLevels: SkillLevels;
  createdAt: Date;
  updatedAt: Date;
}

export type CareerStage = 'student_undergraduate' | 'graduate' | 'senior';

export type CareerPath = 
  | 'ui_ux_designer'
  | 'software_engineer'
  | 'qa_engineer'
  | 'project_manager'
  | 'backend_developer'
  | 'frontend_developer'
  | 'mobile_developer'
  | 'it_support';

export interface SkillLevels {
  problemSolving: number;
  communication: number;
  technicalSkills: number;
  leadership: number;
  adaptability: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface OnboardingData {
  age: number;
  careerStage: CareerStage;
  careerPath: CareerPath;
  tools: string[];
  developmentLanguages: string[];
  skillLevels: SkillLevels;
}