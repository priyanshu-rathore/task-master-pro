/* eslint-disable react-refresh/only-export-components */
import  { createContext, useState, useContext,type ReactNode, useCallback } from 'react';
import * as api from '../services/api';
import toast from 'react-hot-toast';
import type { ITask } from '../types';

interface TaskContextType {
  tasks: ITask[];
  isLoading: boolean;
  fetchTasks: (projectId: string) => Promise<void>;
  addTask: (data: Partial<ITask>) => Promise<void>;
  updateTask: (id: string, data: Partial<ITask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, columnId: string, status: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = useCallback(async (projectId: string) => {
    setIsLoading(true);
    try {
      const response = await api.getTasksForProject(projectId);
      setTasks(response.data);
    } catch {
      toast.error('Failed to fetch tasks.');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = async (data: Partial<ITask>) => {
    try {
      const response = await api.createTask(data);
      setTasks(prev => [...prev, response.data]);
      toast.success('Task created!');
    } catch {
      toast.error('Failed to create task.');
    }
  };

  const updateTask = async (id: string, data: Partial<ITask>) => {
    try {
      const response = await api.updateTask(id, data);
      setTasks(prev => prev.map(t => (t._id === id ? response.data : t)));
      toast.success('Task updated!');
    } catch {
      toast.error('Failed to update task.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      toast.success('Task deleted!');
    } catch {
      toast.error('Failed to delete task.');
    }
  };

  const moveTask = async (taskId: string, columnId: string, status: string) => {
    const originalTasks = tasks;
    setTasks(prev => prev.map(t => (t._id === taskId ? { ...t, columnId, status } : t)));
    try {
      await api.updateTask(taskId, { columnId, status });
    } catch {
      toast.error('Failed to move task.');
      setTasks(originalTasks);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, isLoading, fetchTasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
