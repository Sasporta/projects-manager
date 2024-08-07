export type ProjectType = {
  id: string;
  name: string;
  description: string;
  url: string;
  createdAt: string;
  lastMaintenance: string | null;
  nextMaintenance: string | null;
};

export type ProjectListType = ProjectType[];
