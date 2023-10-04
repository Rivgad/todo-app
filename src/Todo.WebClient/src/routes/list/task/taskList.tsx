import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { ErrorComponent } from '../../../components';
import { Todo } from '../../../model';
import { Container } from '../styles';
import { TaskItem } from './taskItem';
import { TaskForm } from './taskForm';


export const TaskList: React.FC = () => {
    const data = useLoaderData() as { item: Todo };
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
                                <TaskForm />
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