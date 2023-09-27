import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

import { ErrorComponent } from '../../../components';
import { Todo } from '../../../model';
import { Container, ListContainer } from '../styles';
import { TaskItem } from './taskItem';


export const ActionButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.3s ease-in-out;

    &:hover {
        color: #007bff;
    }
`;

export const TaskList: React.FC = () => {
    const data = useLoaderData() as { item: Todo };

    return (
        <Container>
            <ListContainer>
                <React.Suspense fallback={<p>Загрузка...</p>}>
                    <Await
                        resolve={data.item}
                        errorElement={
                            <ErrorComponent>{"Не получилось загрузить список. Попробуйте перезагрузить страницу"}</ErrorComponent>
                        }
                    >
                        {(item: Todo) => {
                            return (
                                <>
                                    <h1>{item.name}</h1>
                                    <table style={{ width: '100%' }}>
                                    </table>
                                    {
                                        item.tasks?.map(task => {
                                            return <TaskItem key={task.id} task={task}></TaskItem>
                                        })
                                    }
                                </>
                            )
                        }}
                    </Await>
                </React.Suspense>
            </ListContainer>
        </Container>
    );
};