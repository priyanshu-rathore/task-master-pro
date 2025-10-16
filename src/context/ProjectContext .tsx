/* eslint-disable react-refresh/only-export-components */
import  { createContext, useState, useContext, type ReactNode, useCallback, useEffect } from 'react';
import * as api from '../services/api';
import toast from 'react-hot-toast';
import type { IProject } from '../types';

interface ProjectContextType {
  projects: IProject[];
  isLoading: boolean;
  fetchProjects: () => void;
  addProject: (data: { name: string; description?: string }) => Promise<void>;
  updateProject: (id: string, data: Partial<IProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.getProjects();
      setProjects(response.data);
    } catch {
      toast.error('Failed to fetch projects.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (data: { name: string; description?: string }) => {
    try {
      const response = await api.createProject(data);
      setProjects(prev => [...prev, response.data]);
      toast.success('Project created!');
    } catch {
      toast.error('Failed to create project.');
    }
  };

  const updateProject = async (id: string, data: Partial<IProject>) => {
    try {
      const response = await api.updateProject(id, data);
      setProjects(prev => prev.map(p => (p._id === id ? response.data : p)));
      toast.success('Project updated!');
    } catch {
      toast.error('Failed to update project.');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
      toast.success('Project deleted!');
    } catch {
      toast.error('Failed to delete project.');
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, isLoading, fetchProjects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};
