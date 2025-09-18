import type { TaskFormData, CategoryFormData } from "./types";

export const validateTaskForm = (data: TaskFormData) => {
  const errors: Record<string, string> = {};

  const title = data.title.trim();
  const description = data.description?.trim() || "";

  // Validations related to title
  if (!title) {
    errors.title = "Title is required";
  } else if (title.length < 2) {
    errors.title = "Title must be at least 2 characters";
  } else if (title.length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  }

  // Validations related to description
  if (description.length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }

  // Validations related to priority
  if (!["Low", "Medium", "High"].includes(data.priority))
    errors.priority = "Invalid priority";

  // Validations related to due date
  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    errors.dueDate = "Due date cannot be in the past";
  }

  return {
    errors,
    sanitizedData: {
      title,
      description,
      priority: data.priority,
      dueDate: data.dueDate,
    },
  };
};

export const validateCategoryForm = (data: CategoryFormData) => {
  const errors: Record<string, string> = {};

  const name = data.name.trim();

  // Validations related to category name
  if (!name) errors.name = "Category name is required";
  else if (name.length < 2)
    errors.name = "Category name must be at least 2 characters";
  else if (name.length > 15)
    errors.name = "Category name cannot exceed 15 characters";

  return {
    errors,
    sanitizedData: { name },
  };
};
