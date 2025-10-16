import React, { useState } from 'react';
import type { IColumn, ITask } from '../types';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  column: IColumn;
  tasks: ITask[];
  // This prop is received from KanbanBoard
  onEditTask: (task: ITask) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onEditTask }) => {
  const { moveTask } = useTasks();
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, column._id, column.name);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`bg-gray-800 p-4 rounded-lg transition-colors min-h-[400px] flex flex-col ${isOver ? 'bg-gray-700' : ''}`}
    >
      <h3 className="font-bold text-center mb-4">{column.name} ({tasks.length})</h3>
      <div className="space-y-3 overflow-y-auto">
        {tasks.map(task => (
          // CORRECTED: The onEdit prop of TaskCard is now connected to the onEditTask function from the parent.
          <TaskCard 
            key={task._id} 
            task={task} 
            onEdit={onEditTask} 
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
