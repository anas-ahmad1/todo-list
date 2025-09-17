"use client";

import { FC } from "react";
import type { Task } from "../utils/types";

export interface TaskActionsProps {
  task: Task;
  isCompleted: boolean;
  onEdit: (task: Task) => void;
}

const TaskActions: FC<TaskActionsProps> = ({
  task,
  isCompleted,
  onEdit,
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
  </div>
);

export default TaskActions;
