"use client";

import { FC } from "react";
import type { Task } from "../utils/types";

export interface TaskActionsProps {
  task: Task;
  isCompleted: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskActions: FC<TaskActionsProps> = ({
  task,
  isCompleted,
  onEdit,
  onDelete,
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
  </div>
);

export default TaskActions;
