import type { Task } from "./task"

const STORAGE_KEY = 'tasks';

export function saveTasks (tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

export function loadTasks(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(!saved) return [];

    const parsed = JSON.parse(saved)
    return parsed.map((task: Task )=> ({
        ...task,
        created: new Date(task.created)
    }));
};