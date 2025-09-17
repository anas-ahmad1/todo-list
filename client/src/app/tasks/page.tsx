"use client";

import { useEffect, useState } from "react";
import type { Task, TaskFormData } from "@/utils/types";
import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TaskContainer from "@/components/TaskContainer";
import { BACKEND_ROUTES } from "@/utils/routes";
import axios from "axios";
import { API_URL } from "@/utils/config";
import { ProtectedRoute } from "@/components/AuthRedirects";

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const todoTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const url = API_URL + BACKEND_ROUTES.TASKS;

  // Backend call to fetch the list of all tasks for the logged in user
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Backend call to update a specific task based on its id
  const updateTask = async (taskId: string, updatedData: Partial<Task>) => {
    try {
      const res = await axios.put(`${url}/${taskId}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (err) {
      console.error("Error updating task:", (err as Error).message);
    }
  };

  // Shows or hides create task form and clear fields
  const handleAddTask = () => {
    setShowAddForm(!showAddForm);
    setFormData({ title: "", description: "", priority: "Low", dueDate: "" });
  };

  // Form submission method to create or edit task
  const handleSubmit = async () => {
    if (editingTask) {
      await updateTask(editingTask._id, formData);
      setEditingTask(null);
    } else {
      try {
        const res = await axios.post(
          url,
          { ...formData, completed: false },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const newTask: Task = res.data;
        setTasks([...tasks, newTask]);
      } catch (err) {
        console.error("Error creating task:", (err as Error).message);
      }
    }

    setFormData({ title: "", description: "", priority: "Low", dueDate: "" });
    setShowAddForm(false);
  };

  // Opens the form to edit and fills the selected task's data
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowAddForm(true);
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate,
    });
  };

  // Backend call to delete a specific task
  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${url}/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", (err as Error).message);
    }
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  // Calls the update method when a task is completed
  const handleMarkComplete = (taskId: string) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed });
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header onAddTask={handleAddTask} showAddForm={showAddForm} />

        {showAddForm && (
          <TaskForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            editingTask={editingTask}
          />
        )}

        <div className="p-6">
          <div className="flex flex-col xl:flex-row gap-6 min-h-[calc(100vh-200px)]">
            <TaskContainer
              title="Todo"
              tasks={todoTasks}
              isCompleted={false}
              emptyMessage="No tasks yet"
              emptySubMessage="Add a task to get started"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={handleMarkComplete}
            />

            <TaskContainer
              title="Completed"
              tasks={completedTasks}
              isCompleted={true}
              emptyMessage="No completed tasks"
              emptySubMessage="Complete some tasks to see them here"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={handleMarkComplete}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TodoList;
