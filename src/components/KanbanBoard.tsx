import React from 'react';
import { useTasks } from '../context/TaskContext';
import type { IProject, ITask } from '../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  project: IProject;
  onEditTask: (task: ITask) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ project, onEditTask }) => {
  const { tasks, isLoading: tasksLoading } = useTasks();

  if (tasksLoading) {
    return <div className="text-center p-8">Loading tasks...</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {project.columns.map(column => (
        <KanbanColumn
          key={column._id}
          column={column}
          tasks={tasks.filter(task => task.columnId === column._id)}
          onEditTask={onEditTask} // Pass the edit handler down
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
