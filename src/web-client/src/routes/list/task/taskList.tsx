import React, { useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

import { Button, ErrorComponent, Input } from '../../../components';
import { Todo } from '../../../model';
import { Container } from '../styles';
import { TaskItem } from './taskItem';


const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;

export const TaskList: React.FC = () => {
    const data = useLoaderData() as { item: Todo };
    const [text, setText] = useState('');

    return (
        <Container style={{ height: "auto", padding: "0 0.7rem 2rem" }}>
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
                                <InputContainer>
                                    <Input
                                        style={{ flex: 1 }}
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Введите текст..." />
                                    <Button style={{ marginLeft: "1rem" }}>
                                        Добавить пункт
                                    </Button>
                                </InputContainer>
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
        </Container>
    );
};