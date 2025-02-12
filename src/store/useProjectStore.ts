import { create } from 'zustand';

// Define the Project type
interface Project {
  projectName: string;
  location: string;
  image: string;
  price: string;
  builderName: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
}

// Define the Store state and actions
interface ProjectsStore {
  projects: Project[];
  addProject: (project: Project) => void;
  clearProjects: () => void;
}

// Create the store
export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  clearProjects: () => set({ projects: [] }),
}));
