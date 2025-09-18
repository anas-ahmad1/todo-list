export type Task = {
    _id: string;
    title: string;
    description?: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    completed: boolean;
};

export type TaskFormData = {
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
};

export interface CategoryFormData {
  name: string;
}
