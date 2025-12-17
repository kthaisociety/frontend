export type TeamMember = {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  linkedin?: string;
};

export type Team = {
  id: string;
  name: string;
  subtitle?: string;  
  description?: string; 
  category?: "AI" | "IT" | "Business" | "Growth";
  tags?: string[];
  members?: TeamMember[];
};
