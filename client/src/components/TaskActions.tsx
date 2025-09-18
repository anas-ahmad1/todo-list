"use client";

import { FC } from "react";
import type { Task } from "../utils/types";
import { FaEdit, FaTrash, FaCheck, FaUndo } from "react-icons/fa";

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
        className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
      >
        <FaEdit />
      </button>
    )}

    <button
      onClick={() => onDelete(task._id)}
      className="px-3 py-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
    >
      <FaTrash />
    </button>

    <button
      onClick={() => onToggleComplete(task._id)}
      className={`px-3 py-2 text-xs rounded ${
        isCompleted
          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
          : "bg-green-100 text-green-700 hover:bg-green-200"
      }`}
    >
      {isCompleted ? <FaUndo/> : <FaCheck/>}
    </button>

  </div>
);

export default TaskActions;
