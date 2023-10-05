import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { ErrorComponent } from '../../../components';
import { TodoList } from '../../../model';
import { Container } from '../styles';
import { TodoItemComponent } from './todoItemComponent';
import { TodoItemInput } from './taskItemInput';


export const TodoItemList: React.FC = () => {
    const data = useLoaderData() as { item: TodoList };
    return (
        <Container style={{ height: "auto", padding: "0 0.7rem 2rem" }}>
            <React.Suspense fallback={<p>Загрузка...</p>}>
                <Await
                    resolve={data.item}
                    errorElement={
                        <ErrorComponent>{"Не получилось загрузить список. Попробуйте перезагрузить страницу"}</ErrorComponent>
                    }
                >
                    {(item: TodoList) => {
                        return (
                            <>
                                <h1>{item.name}</h1>
                                <TodoItemInput />
                                {
                                    item.tasks?.map(task => {
                                        return <TodoItemComponent key={task.id} item={task}></TodoItemComponent>
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