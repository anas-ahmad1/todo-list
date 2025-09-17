"use client";

import { useEffect, useState } from "react";
import type { Task, TaskFormData } from "@/utils/types";
import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TaskContainer from "@/components/TaskContainer";
import { BACKEND_ROUTES } from "@/utils/routes";
import axios from "axios";
import { API_URL } from "@/utils/config";

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  // Shows or hides create task form and clear fields
  const handleAddTask = () => {
    setShowAddForm(!showAddForm);
    setFormData({ title: "", description: "", priority: "Low", dueDate: "" });
  };

  // Form submission method to create task
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        url,
        { ...formData, completed: false },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const newTask: Task = res.data;
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Error creating task:", (err as Error).message);
    }

    setFormData({ title: "", description: "", priority: "Low", dueDate: "" });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={handleAddTask} showAddForm={showAddForm} />

      {showAddForm && (
        <TaskForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
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
          />

          <TaskContainer
            title="Completed"
            tasks={completedTasks}
            isCompleted={true}
            emptyMessage="No completed tasks"
            emptySubMessage="Complete some tasks to see them here"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
