import { type Task } from "../entities/task.js";

export function filterTasks(arr: Task[]) : Task[] {
   return [...arr].sort((a,b) => a.created.getTime() - b.created.getTime())
}