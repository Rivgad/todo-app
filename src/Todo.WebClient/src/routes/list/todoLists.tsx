import React from 'react';
import { Await, useFetcher, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { BaseLink, ErrorComponent } from '../../components';
import { TodoList } from '../../model';
import { Container, DeleteButton, ListItem, ListContainer } from './styles';
import { UUID } from 'crypto';
import { TodoListForm } from './todoListForm';


const Link = styled(BaseLink)`
    margin: 0;
    text-align: left;
    padding: 1rem;
`

export const TodoLists: React.FC = () => {
    const data = useLoaderData() as { items: Array<TodoList> };
    const fetcher = useFetcher();

    const deleteTodo = (id: UUID) => {
        fetcher.submit({ id: id }, {
            method: "delete",
            action: "/list/delete"
        })
    };

    return (
        <Container>
            <ListContainer>
                <React.Suspense fallback={<p>Загрузка...</p>}>
                    <Await
                        resolve={data.items}
                        errorElement={
                            <ErrorComponent>{"Не получилось загрузить список. Попробуйте перезагрузить страницу"}</ErrorComponent>
                        }
                    >
                        {(items: Array<TodoList>) => {
                            return items.length !== 0
                                ? items.map((item) => (
                                    <ListItem key={item.id}>
                                        <Link to={`/list/${item.id}`}>
                                            {item.name}
                                        </Link>
                                        <DeleteButton
                                            disabled={fetcher.state === "submitting"}
                                            onClick={() => deleteTodo(item.id)}
                                        >
                                            Удалить
                                        </DeleteButton>
                                    </ListItem>
                                ))
                                : <p>Ещё нет ни одного списка. Создайте свой первый!</p>
                        }}
                    </Await>
                </React.Suspense>
            </ListContainer>
            <ErrorComponent>{fetcher.data?.error}</ErrorComponent>
            <TodoListForm />
        </Container>
    );
};
