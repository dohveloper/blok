import React from 'react';
import styled from 'styled-components';

interface CardProps {
    movableIcon: string;
    icon: string;
    title: string;
    trashCan: string;
    dropdown: string;
}

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background: darkgrey;
    width: 400px;
`;
const CardContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background: lightgrey;
    width: 400px;
`;
export default function TestCard(props: React.PropsWithChildren<CardProps>) {
    const { movableIcon, icon, title, trashCan, dropdown, children } = props;
    return (
        <>
            <CardHeader>
                <div>{movableIcon ? 'moveIcon' : ''}</div>
                <div>{icon ? 'icon' : ''}</div>
                <div>{title}</div>
                <div>{trashCan ? 'trashCan' : ''}</div>
                <div>{dropdown ? 'dropdown' : ''}</div>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </>
    );
}
