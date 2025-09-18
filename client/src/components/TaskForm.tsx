"use client";

import type { Task, TaskFormData } from "../utils/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
  formData: TaskFormData;
  setFormData: (data: TaskFormData) => void;
  onSubmit: () => void;
  editingTask: Task | null;
  errors: Record<string, string>;
}

const TaskForm = ({
  formData,
  setFormData,
  onSubmit,
  editingTask,
  errors
}: TaskFormProps) => {
  return (
    <div className="container-bg px-6 py-4">
      <h2 className="text-xl font-semibold mb-4">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2"
            required
          />
          {errors.title && <p className="text-sm">{errors.title}</p>}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2"
          />
          {errors.description && <p className="text-sm">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value as "Low" | "Medium" | "High",
              })
            }
            className="w-full px-3 py-2"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <p className="text-sm">{errors.priority}</p>}
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
            Due Date
          </label>
          <DatePicker
            id="dueDate"
            selected={formData.dueDate ? new Date(formData.dueDate) : null}
            onChange={(date: Date | null) =>
              setFormData({
                ...formData,
                dueDate: date ? date.toISOString() : "",
              })
            }
            minDate={new Date()}
            placeholderText="25 Sep, 2025"
            className="w-full px-3 py-2 border rounded"
            wrapperClassName="w-full" 
          />
          {errors.dueDate && <p className="text-sm">{errors.dueDate}</p>}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onSubmit}
          className="px-6 py-2 rounded-lg primary-bg"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
