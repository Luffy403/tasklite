import { normalizeTitle } from "../utils/validation.js";

export type Task = { // тип для задачи
    readonly id: string; 
    title: string;
    created: Date;
    complete: boolean;
    description?: string
}

export type Filter = 'all' | 'active' | 'completed'; // фильтрация задач

export function generateId():string {
    return  Math.random().toString(36).slice(7);
}

export function makeTask(title:string) : Task { //функция добавления задачи
    return {
        id: generateId(), 
        title: normalizeTitle(title),
        description: '',
        created: new Date(),
        complete: false,
    }
}