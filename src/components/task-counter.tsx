import styled from '@emotion/styled';

type TaskCounterProps = {
    total: number;
    active: number;
    completed: number;
    percent: number;
}


const CounterStats = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const StatItem = styled.span`
    font-weight: 500;
`;

export function TaskCounter( props : TaskCounterProps) {
    return (
            <CounterStats>
                <StatItem>Всего: {props.total}</StatItem>
                <StatItem>Активных: {props.active}</StatItem>
                <StatItem>Завершено: {props.completed}</StatItem>
            </CounterStats>
    );
}