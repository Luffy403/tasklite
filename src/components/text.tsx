import styled from "@emotion/styled";
import Logo from "../assets/react.svg"

export type Text = {
    text: string;
}

const StyledH1 = styled.h1`
    color: ${p => p.theme.colors.accent};
    font-size: ${p => p.theme.spacing(4)}
`;
const StyledP = styled.p`
    font-size: ${p => p.theme.spacing(2.6)};
    color: ${p => p.theme.colors.error};
`;
const StyledSpan = styled.span`
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: center; 
`
export function TextZag(){
    return (
        <div className="suda">
            <StyledSpan>
                <StyledH1>TaskLite йоу</StyledH1>
                <img src={Logo}/>
            </StyledSpan>
            <StyledP>Это мой первый проект на React</StyledP>
        </div>
    );
}