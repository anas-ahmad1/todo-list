"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/utils/types";
import TaskContainer from "@/components/TaskContainer";
import { BACKEND_ROUTES } from "@/utils/routes";
import axios from "axios";
import { API_URL } from "@/utils/config";

const TodoList = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

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


   

    return (
        <div className="min-h-screen bg-gray-50">

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
