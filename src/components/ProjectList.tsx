import React from 'react';
import type { IProject } from '../types';

interface ProjectListProps {
  projects: IProject[];
  isLoading: boolean;
  selectedProject: string | null;
  onSelectProject: (id: string) => void;
  onEditProject: (project: IProject) => void;
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isLoading, selectedProject, onSelectProject, onEditProject, onDeleteProject, onNewProject }) => {
  if (isLoading) return <div className="bg-gray-800 p-4 rounded-lg">Loading...</div>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <ul className="space-y-2 flex-grow overflow-y-auto">
        {projects.map(project => (
          <li
            key={project._id}
            onClick={() => onSelectProject(project._id)}
            className={`p-3 rounded cursor-pointer group flex justify-between items-center transition-colors ${
              selectedProject === project._id ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <span>{project.name}</span>
            <div className="hidden group-hover:flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); onEditProject(project); }} className="text-gray-300 hover:text-white">✏️</button>
              <button onClick={(e) => { e.stopPropagation(); onDeleteProject(project._id); }} className="text-gray-300 hover:text-white">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onNewProject} className="mt-4 w-full p-2 bg-green-600 rounded hover:bg-green-700">
        + New Project
      </button>
    </div>
  );
};

export default ProjectList;
