import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import KanbanBoard from './KanbanBoard';
import AIAssistant from './AIAssistant';
import ProjectModal from './ProjectModal';
import TaskModal from './TaskModal';
import type { IProject, ITask } from '../types';
import { useProjects } from '../context/ProjectContext ';
import ProjectList from './ProjectList';

const ProjectDashboard: React.FC = () => {
  const { projects, isLoading: projectsLoading, deleteProject } = useProjects();
  const { fetchTasks } = useTasks();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject);
    } else {
        if (projects.length > 0) {
            setSelectedProject(projects[0]._id);
        }
    }
  }, [selectedProject, fetchTasks, projects]);

  const handleEditProject = (project: IProject) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project and all its tasks?')) {
      deleteProject(id);
      setSelectedProject(null);
    }
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const currentProject = projects.find(p => p._id === selectedProject);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProjectList
            projects={projects}
            isLoading={projectsLoading}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onNewProject={() => { setEditingProject(null); setIsProjectModalOpen(true); }}
          />
        </div>
        <div className="lg:col-span-3">
          {currentProject ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <h2 className="text-2xl font-bold mb-4">{currentProject.name}</h2>
                <button 
                    onClick={() => { setEditingTask(null); setIsTaskModalOpen(true); }} 
                    className="mb-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">
                    New Task
                </button>
                <KanbanBoard project={currentProject} onEditTask={handleEditTask} />
              </div>
              <div className="xl:col-span-1">
                <AIAssistant projectId={currentProject._id} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg p-8">
              <p className="text-gray-400 text-lg">
                {projectsLoading ? 'Loading projects...' : 'No projects found. Create one to get started!'}
              </p>
            </div>
          )}
        </div>
      </div>

      {isProjectModalOpen && (
        <ProjectModal
          project={editingProject}
          onClose={() => setIsProjectModalOpen(false)}
        />
      )}

      {isTaskModalOpen && currentProject && (
        <TaskModal
          task={editingTask}
          project={currentProject}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectDashboard;
