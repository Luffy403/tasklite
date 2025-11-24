import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { TaskItem } from "./task-items";

type TaskListProp = {
    tasks: Task[];
    onRemove: (id:string) => void;
    onEdit: (task:Task) => void
    onTogle: (id:string) => void;
}

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export function TasksList(props : TaskListProp){
    const list = props.tasks.map(task => <TaskItem task={task} key={task.id} onEdit={props.onEdit} onTogle={props.onTogle} onRemove={props.onRemove} />);
    const result = list.length > 0 ? list : <li>Список пуст</li>;
    return <StyledUl>{result}</StyledUl>;
}