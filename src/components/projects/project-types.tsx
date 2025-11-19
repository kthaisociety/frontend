export type ProjectMember = {
    id: string;
    name: string;
    role?: string;
    avatarUrl?: string;
    linkedin?: string;
  };
  
  export type Project = {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    tags?: string[];
    members?: ProjectMember[];
    repo?: string;
  };
  