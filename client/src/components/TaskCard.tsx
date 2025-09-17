"use client";

import { FC } from "react";
import type { Task } from "../utils/types";
import TaskActions from "./TaskActions";
import { getPriorityColor } from "../utils/taskUtils";

export interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  isCompleted,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {

  const { title, description, priority, dueDate } = task;
  
  return (
    <div className="container-bg rounded-2xl p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${
              isCompleted ? "line-through" : ''
            }`}
          >
            {title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mt-1 ${
                isCompleted ? "line-through" : ''
              }`}
            >
              {description}
            </p>
          )}
        </div>
        <span
          className={`px-4 py-1 text-xs rounded-2xl ${getPriorityColor(
            task.priority
          )}`}
        >
          {priority}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span
          className="text-sm"
        >
          {dueDate}
        </span>

        <TaskActions
          task={task}
          isCompleted={isCompleted}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      </div>
    </div>
  );
};

export default TaskCard;
