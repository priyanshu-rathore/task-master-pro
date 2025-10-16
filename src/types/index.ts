// Shared types used across the frontend

export interface IColumn {
  _id: string;
  name: string;
}

export interface IProject {
  _id: string;
  name: string;
  description: string;
  createdDate: string;
  columns: IColumn[];
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: string;
  project: string; // Project ID
  columnId: string; // Column ID
}
