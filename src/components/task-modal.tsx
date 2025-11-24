import { useEffect, useState} from "react"
import type { Task } from "../entities/task";
import styled from "@emotion/styled";
import { ButtonClose, ButtonSave } from "./button";

type TaskModalProp = {
    task: Task;
    onSave: (id:string, newTitle:string, newDescription: string)=> void
    onClose: () => void
}

const ModalBack = styled.div`
    position: fixed;
    z-index: 5;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0px;
`
const Modal = styled.div`
    background: ${p => p.theme.colors.background};
    padding: ${p => p.theme.spacing(4)};
    border-radius: ${p => p.theme.spacing(1)};
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    width: 100%;
`

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${p => p.theme.spacing(1.5)};
    justify-content: end;
`

const StyledInput = styled.input`
    border: 2px solid ${p => p.theme.colors.border};
    padding: ${p =>p.theme.spacing(1.6)};
    border-radius: ${p => p.theme.spacing(1.3)};
`

const StyledTextarea = styled.textarea`
    min-height: ${p => p.theme.spacing(10)};
    border: 2px solid ${p => p.theme.colors.border};
    padding: ${p =>p.theme.spacing(1.3)} ${p =>p.theme.spacing(1.6)};
    border-radius: ${p => p.theme.spacing(1.3)};
    resize: vertical;
`

export function TaskModal(props:TaskModalProp){
    const [title, setTitle] = useState(props.task.title);
    const [description, setDescription] = useState(props.task.description || '');



    function HandleInput(){
        return <StyledInput value={title} onChange={e => setTitle(e.target.value)}  type="text" />
    }
    function HandleTextarea(){
        return <StyledTextarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Введите описание" />
    }


    useEffect( () => {
        function handler(event: KeyboardEventInit){
            if(event.key === 'Escape') props.onClose();
        }
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler)
    }, [props]);

    return (
        <ModalBack>
            <Modal>
                <h2>Редактирование задачи</h2>
                <HandleInput/>
                <HandleTextarea/>
                <ButtonRow>
                    <ButtonClose onClose={props.onClose} text="Отмена"/>
                    <ButtonSave onClick={() => props.onSave(props.task.id, title, description)} text="Сохранить" />
                </ButtonRow>
            </Modal>
        </ModalBack>
    )
}