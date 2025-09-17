"use client";

import { FC } from "react";
import type { Task } from "../utils/types";
import TaskActions from "./TaskActions";

export interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  isCompleted,
  onEdit,
  onDelete,
}) => {
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${
              isCompleted ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mt-1 ${
                isCompleted ? "line-through text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span
          className={`text-sm ${
            isCompleted ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {task.dueDate}
        </span>

        <TaskActions
          task={task}
          isCompleted={isCompleted}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default TaskCard;
