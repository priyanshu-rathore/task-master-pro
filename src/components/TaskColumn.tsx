import React, { useState } from "react";
import TaskCard from "./TaskCard";
import type { IColumn, ITask } from "../types";

interface TaskColumnProps {
  column: IColumn;
  tasks: ITask[];
  onDrop: (taskId: string, newColumnId: string, newStatus: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks, onDrop }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
    const taskId = event.dataTransfer.getData("taskId");
    if (taskId) {
      onDrop(taskId, column._id, column.name);
    }
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col h-full transition-colors ${
        isOver ? "bg-gray-700" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className="font-bold text-xl mb-4 text-center sticky top-0 bg-gray-800 py-2">
        {column.name} ({tasks.length})
      </h3>
      <div className="flex-grow overflow-y-auto pr-2">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
