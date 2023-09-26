import React from 'react';
import { Await, useFetcher, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { BaseLink, Button, ErrorComponent } from '../../components';
import { Todo } from '../../model';
import { Container, DeleteButton, ListItem, ListContainer } from './styles';


const Link = styled(BaseLink)`
    margin: 0;
    text-align: left;
    padding: 1rem;
`

const TodoList: React.FC = () => {
    const data = useLoaderData() as { items: Array<Todo> };
    const fetcher = useFetcher();

    const addTodo = () => {
        const name = prompt("Введите название:");
        if (name) {
            fetcher.submit({ name: name }, {
                method: "post",
                action: "/list"
            })
        }
    };

    const deleteTodo = (id: number) => {
        fetcher.submit({ id: id }, {
            method: "delete",
            action: "/list"
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
                        {(items: Array<Todo>) => {
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
            <Button
                style={{ margin: '1rem auto', width: '100%' }}
                disabled={fetcher.state === "submitting"}
                onClick={addTodo}
            >
                Создать
            </Button>
        </Container>
    );
};

export default TodoList;
