import axios from "axios";
import type { IProject, ITask } from "../types";

const API_BASE_URL = import.meta.env.VITE_BASE_URL 

// Create an Axios instance for consistent configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Project API Functions ---
export const getProjects = () => apiClient.get<IProject[]>("/projects");
export const getProjectById = (id: string) =>
  apiClient.get<IProject>(`/projects/${id}`);
export const createProject = (projectData: {
  name: string;
  description?: string;
}) => apiClient.post<IProject>("/projects", projectData);
export const updateProject = (id: string, projectData: Partial<IProject>) =>
  apiClient.put<IProject>(`/projects/${id}`, projectData);
export const deleteProject = (id: string) =>
  apiClient.delete(`/projects/${id}`);

// --- Task API Functions ---
export const getTasksForProject = (projectId: string) =>
  apiClient.get<ITask[]>("/tasks", { params: { projectId } });
export const createTask = (taskData: Partial<ITask>) =>
  apiClient.post<ITask>("/tasks", taskData);
export const updateTask = (id: string, taskData: Partial<ITask>) =>
  apiClient.put<ITask>(`/tasks/${id}`, taskData);
export const deleteTask = (id: string) => apiClient.delete(`/tasks/${id}`);

// --- Gemini AI API Functions ---
export const getProjectSummary = (projectId: string) =>
  apiClient.get<{ summary: string }>(`/ai/summarize/${projectId}`);
export const askProjectQuestion = (projectId: string, question: string) =>
  apiClient.post<{ answer: string }>(`/ai/ask/${projectId}`, { question });

export default apiClient;
