import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import type { ITask, IProject } from '../types';

interface TaskModalProps {
  task: ITask | null;
  project: IProject;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, project, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState(project.columns[0]?._id || '');
  const { addTask, updateTask } = useTasks();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumnId(task.columnId);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !columnId) return;

    const column = project.columns.find(c => c._id === columnId);
    const taskData = {
      title,
      description,
      project: project._id,
      columnId,
      status: column?.name || 'To Do'
    };
    
    if (task) {
      await updateTask(task._id, taskData);
    } else {
      await addTask(taskData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 bg-gray-700 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-gray-700 rounded h-20" />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Column</label>
            <select value={columnId} onChange={(e) => setColumnId(e.target.value)} className="w-full p-2 bg-gray-700 rounded">
              {project.columns.map(col => (
                <option key={col._id} value={col._id}>{col.name}</option>
              ))}
            </select>
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

export default TaskModal;
