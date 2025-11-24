import { useState } from "react";
import type { Task } from "../entities/task"
import styled from "@emotion/styled"


type TaskItemProp = {
    task: Task;
    onRemove: (id:string) => void
    onEdit: (task:Task) => void
    onTogle: (id: string) => void
}

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    background-color: white;
    border-radius: ${p => p.theme.radius.sm};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
`;

const TitleTask = styled.h3<{ completed: boolean }>`
    color: ${p => p.completed ? p.theme.colors.textMuted : p.theme.colors.text};
    text-decoration: ${p => (p.completed ? 'line-through' : 'none')};
    margin: 0 0 8px 0;
    cursor: pointer;

`;

const TaskContent = styled.div`
    flex: 1;
`;

const TaskDate = styled.p`
    font-size: 12px;
    color: ${p => p.theme.colors.textMuted};
    margin: 0;
`;

const TaskActions = styled.div`
    display: flex;
    gap: 5px;
    align-items: flex-start;
`;

const DescriptionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${p => p.theme.colors.text};
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 3px;
`;

const DescriptionText = styled.div`
    margin-top: 8px;
    padding: 8px;
    background-color: ${p => p.theme.colors.background};
    border-radius: ${p => p.theme.radius.sm};
    font-size: 14px;
    color: ${p => p.theme.colors.text};
    border-left: 3px solid ${p => p.theme.colors.text};
`;

export function TaskItem(props: TaskItemProp) {
    const [title, setTitle] = useState(props.task.title);
    const [isEditing, setIsEditing] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    function handleSave(){
        // Исправлено: передаем обновленный task целиком
        const updatedTask = {
            ...props.task,
            title: title
        };
        props.onEdit(updatedTask); // Теперь передаем 1 аргумент вместо 2
        setIsEditing(false);
    }

    function handleTaskClick() {
        props.onTogle(props.task.id);
    }

    function toggleDescription() {
        setShowDescription(!showDescription);
    }

    const hasDescription = props.task.description && props.task.description.trim().length > 0;

    return (
        <Item>
            <TaskContent>
                {isEditing ?(
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={handleSave}
                        autoFocus
                    />
                ) : (
                    <>
                        <TitleTask 
                            completed={props.task.complete} 
                            onClick={handleTaskClick}
                        >
                            {props.task.title}
                        </TitleTask>
                        
                        {hasDescription && (
                            <>
                                <DescriptionButton onClick={toggleDescription}>
                                    {showDescription ? '...' : '...'}
                                </DescriptionButton>
                                
                                {showDescription && (
                                    <DescriptionText>
                                        {props.task.description}
                                    </DescriptionText>
                                )}
                            </>
                        )}
                    </>
                )}
                <TaskDate>{props.task.created.toLocaleString()}</TaskDate>
            </TaskContent>
            <TaskActions>
                <DeleteButton onClick={() => props.onEdit(props.task)}>✏️</DeleteButton>
                <DeleteButton onClick={() => props.onRemove(props.task.id)}>❌</DeleteButton>
            </TaskActions>
        </Item>
    );
}