import React, { useState, useEffect } from 'react';
import type { IProject } from '../types';
import { useProjects } from '../context/ProjectContext ';

interface ProjectModalProps {
  project: IProject | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { addProject, updateProject } = useProjects();

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (project) {
      await updateProject(project._id, { name, description });
    } else {
      await addProject({ name, description });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{project ? 'Edit Project' : 'Create Project'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded h-24"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
