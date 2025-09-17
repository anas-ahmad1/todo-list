"use client";

import { FC } from "react";
import type { Task } from "../utils/types";

export interface TaskActionsProps {
  task: Task;
  isCompleted: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskActions: FC<TaskActionsProps> = ({
  task,
  isCompleted,
  onEdit,
  onDelete,
  onToggleComplete,
}) => (
  <div className="flex space-x-2">
    {!isCompleted && (
      <button
        onClick={() => onEdit(task)}
        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
      >
        Edit
      </button>
    )}

    <button
      onClick={() => onDelete(task._id)}
      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
    >
      Delete
    </button>

    <button
      onClick={() => onToggleComplete(task._id)}
      className={`px-3 py-1 text-xs rounded transition-colors ${
        isCompleted
          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
          : "bg-green-100 text-green-700 hover:bg-green-200"
      }`}
    >
      {isCompleted ? "Undo" : "Complete"}
    </button>
  </div>
);

export default TaskActions;
