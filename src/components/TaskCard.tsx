import React from 'react';
import type { ITask } from '../types';
import { useTasks } from '../context/TaskContext';

interface TaskCardProps {
  task: ITask;
  // The onEdit prop is now defined to accept the task object that needs to be edited.
  onEdit: (task: ITask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { deleteTask } = useTasks();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task._id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-gray-700 p-3 rounded-md shadow-sm cursor-grab active:cursor-grabbing group"
    >
      <div className="flex justify-between items-start">
        <p className="font-semibold break-words">{task.title}</p>
        <div className="hidden group-hover:flex gap-2">
          {/* CORRECTED: The onEdit function is now called with the current task object */}
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(task); }} 
            className="text-gray-300 hover:text-white"
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete} 
            className="text-gray-300 hover:text-white"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-1 break-words">{task.description}</p>
    </div>
  );
};

export default TaskCard;
