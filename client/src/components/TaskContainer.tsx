import { FC } from "react";
import type { Task } from "../utils/types";
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

export interface TaskContainerProps {
  title: string;
  tasks: Task[];
  isCompleted: boolean;
  emptyMessage: string;
  emptySubMessage: string;
  onEdit: (task: Task) => void;
}

const TaskContainer: FC<TaskContainerProps> = ({
  title,
  tasks,
  isCompleted,
  emptyMessage,
  emptySubMessage,
  onEdit,
}) => (
  <div className="w-full xl:w-1/2">
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 h-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {title}
      </h2>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              isCompleted={isCompleted}
              onEdit={onEdit}
            />
          ))
        ) : (
          <EmptyState message={emptyMessage} subMessage={emptySubMessage} />
        )}
      </div>
    </div>
  </div>
);

export default TaskContainer;
