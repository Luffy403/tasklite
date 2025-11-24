import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { TasksList } from '../components/tasks-list';
import { TextZag } from '../components/text';
import { makeTask, type Task } from '../entities/task';
import { loadTasks, saveTasks } from '../entities/storage';
import { TaskModal } from '../components/task-modal';
import { TaskCounter } from '../components/task-counter';

const Wrapper = styled.div`
    padding: ${p => p.theme.spacing(5)};
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
`;
const StyledInput = styled.input`
    padding: ${p => p.theme.spacing(1)};
    border-radius: ${p => p.theme.radius.sm};
    border: none;
    max-width: 430px;
    width:100%;
    padding-left: 20px;
`;

const StyledInputRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const BGProgress = styled.div`
    background: rgb(229, 229, 229);
`
const FillProgress = styled.div<{active: number}>`
    background: linear-gradient(90deg, rgb(155, 121, 207), rgb(103, 76, 140));
    padding: ${p=>p.theme.spacing(0.8)};
    border-radius: ${p=>p.theme.radius.lg};
    width: ${p=>p.active}%;
    transition: width 1s ease;
`
const ButtonFilter = styled.button<{active: boolean}>`
    padding: ${p => p.theme.spacing(1)};
    border-radius: ${p=>p.theme.radius.sm};
    background: ${p=>(p.active ? 'rgb(155, 121, 207)' : 'white')};
    color: ${p=>(p.active ? 'white' : 'black')};
    border: 1px solid #ddd;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${p=>(p.active ? 'rgb(145, 111, 197)' : '#f5f5f5')};
    }
`
const InputSearch = styled.input`
    width: 100%;
    padding: ${p=>p.theme.spacing(1)};
    padding-left: 20px;
    border-radius: ${p => p.theme.radius.sm};
    border: 1px solid #ddd;
`
const FilterRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${p=>p.theme.spacing(1)};
    align-items: center;
    justify-content: space-between;
`

const FilterControls = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${p=>p.theme.spacing(1)};
    align-items: center;
`

const SortSelect = styled.select`
    padding: ${p => p.theme.spacing(1)};
    border-radius: ${p=>p.theme.radius.sm};
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
`

const ClearButton = styled.button`
    padding: ${p => p.theme.spacing(1)};
    border-radius: ${p=>p.theme.radius.sm};
    background: rgb(145, 111, 197);
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
`


export function TasksPage() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filter, setFilter] = useState<string>('Все');
    const [query, setQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    function handleRemoveItem(idTarget: string) {
        setTasks(tasks.filter(t => t.id !== idTarget));
    }

    function handleAddItem(title: string) {
        const newTitle = makeTask(title);
        setTasks([newTitle, ...tasks]);
        setTask('');
    }

    function handleEditItem(id: string, newTitle: string, newDescription: string) {
        setTasks(
            tasks.map((task: Task) => ({
                ...task,
                title: id === task.id ? newTitle : task.title,
                description: id === task.id ? newDescription : task.description
            }))
        );
        setEditingTask(null);
    }

    function handleTogleItem(id: string) {
        setTasks(
            tasks.map((task: Task) => 
                id === task.id ? {...task, complete: !task.complete} : task
            )
        );
    }

    function handleClearCompleted() {
        setTasks(tasks.filter(task => !task.complete));
    }

    function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSortOrder(event.target.value as 'newest' | 'oldest');
    }

    const total = tasks.length;
    const completed = tasks.filter(task => task.complete).length;
    const active = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0; 

    // Фильтрация задач
    const filteredTasks = tasks.filter(task => {
        if (filter === 'Завершённые') return task.complete;
        if (filter === 'Активные') return !task.complete;
        return task;
    });

    // Сортировка задач
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
        } else {
            return new Date(a.created).getTime() - new Date(b.created).getTime();
        }
    });

    // Поиск задач
    const searchTasks = sortedTasks.filter(task => {
        return task.title.toLowerCase().includes(query);
    });

    return (
        <Wrapper>
            <TextZag />
            <StyledInputRow>
                <StyledInput
                    value={task}
                    onChange={event => setTask(event.target.value)}
                    type="text"
                    placeholder='Введите задачу'
                />
                <Button info='Добавить' onClick={() => handleAddItem(task)} />
            </StyledInputRow>
            
            <InputSearch 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                type="text" 
                placeholder='Поиск задач'
            />
            
            <FilterRow>
                <FilterControls>
                    <ButtonFilter 
                        active={filter === 'Все'} 
                        onClick={() => setFilter('Все')}
                    >
                        Все
                    </ButtonFilter>
                    <ButtonFilter 
                        active={filter === 'Активные'} 
                        onClick={() => setFilter('Активные')}
                    >
                        Активные
                    </ButtonFilter>
                    <ButtonFilter 
                        active={filter === 'Завершённые'} 
                        onClick={() => setFilter('Завершённые')}
                    >
                        Завершённые
                    </ButtonFilter>
                    
                    <SortSelect value={sortOrder} onChange={handleSortChange}>
                        <option value="newest">Сначала новые</option>
                        <option value="oldest">Сначала старые</option>
                    </SortSelect>
                </FilterControls>
                
            </FilterRow>
            
            <BGProgress>
                <FillProgress active={percent} />
            </BGProgress>
            <p>Завершено: {percent}%</p>
            
            <TasksList 
                tasks={searchTasks} 
                onEdit={(task) => setEditingTask(task)} 
                onRemove={handleRemoveItem}
                onTogle={handleTogleItem}
            />
            <div>
                <TaskCounter total={total} active={active} completed={completed} percent={percent} />
                <ClearButton 
                    onClick={handleClearCompleted}
                    disabled={completed === 0}
                >
                    Очистить выполненные
                </ClearButton>
            </div>
            
            
            {editingTask && (
                <TaskModal 
                    task={editingTask} 
                    onSave={handleEditItem} 
                    onClose={() => setEditingTask(null)} 
                />
            )}        
        </Wrapper>
    );
}