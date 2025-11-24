import styled from '@emotion/styled';

type ButtonAddProp = {
    info : string
    onClick: () => void
}

type ButtonModalCloseProp = {
    text: string;
    onClose: () => void
}

type ButtonModalSaveProp = {
    text: string;
    onClick: () => void
}

const StyledButton = styled.button`
    background-color: ${p => p.theme.colors.accent};
    color: ${p => p.theme.colors.background};
    border: none;
    cursor: pointer;
    border-radius: ${p => p.theme.radius.md};
    padding: ${p => p.theme.spacing(1.5)} ${p => p.theme.spacing(3)};
    &:hover {
        background-color: ${p => p.theme.colors.accentHover};
    }
    max-width: 170px;
    width: 100%;
`;

const StyledButtonClose = styled.button`
    border: 2px solid ${p => p.theme.colors.border};
    padding: 8px 14px;
    background: ${p => p.theme.colors.surface};
    border-radius: ${p => p.theme.spacing(1)};
`

const StyledButtonSave = styled.button`
    border: none;
    padding: 8px 14px;
    background-color: ${p => p.theme.colors.accent};
    border-radius: ${p => p.theme.spacing(1)};
    color: ${p => p.theme.colors.background};
`

export function Button(p : ButtonAddProp){
    return <StyledButton onClick={p.onClick}>{p.info}</StyledButton>
}   

export function ButtonClose(p: ButtonModalCloseProp){
    return <StyledButtonClose onClick={p.onClose}>{p.text}</StyledButtonClose>
}

export function ButtonSave(p:ButtonModalSaveProp){
    return <StyledButtonSave onClick={p.onClick}>{p.text}</StyledButtonSave>
}