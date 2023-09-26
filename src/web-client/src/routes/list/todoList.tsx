import React from 'react';
import { Await, useFetcher, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Todo } from '../../services/listService';
import { BaseLink, Button, ErrorComponent, RedButton } from '../../components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 35rem;
`;

const ListContainer = styled.div`
    flex: auto;
    overflow-y: auto;
    overflow-wrap: anywhere;
`;

const TodoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 0.1rem solid #ddd;
    margin-top: 1rem;
`;

const Link = styled(BaseLink)`
    margin: 0;
    text-align: left;
    padding: 1rem;
`

const DeleteButton = styled(RedButton)`
    overflow-wrap: initial;
`

const TodoList: React.FC = () => {
    const data = useLoaderData() as { items: Array<Todo> };
    const fetcher = useFetcher();

    const addTodoList = () => {
        const name = prompt("Введите название:");
        if (name) {
            fetcher.submit({ name: name }, {
                method: "post",
                action: "/list"
            })
        }
    };

    return (
        <Container>
            <ListContainer>
                <React.Suspense fallback={<p>Загрузка...</p>}>
                    <Await
                        resolve={data.items}
                        errorElement={
                            <ErrorComponent message='Не получилось загрузить список. Попробуйте перезагрузить страницу' />
                        }
                    >
                        {(items: Array<Todo>) => {
                            console.log(items)
                            return items.length !== 0
                                ? items.map((item) => (
                                    <TodoItem key={item.id}>
                                        <Link to={`/list/${item.id}`}>
                                            {item.name}
                                        </Link>
                                        <DeleteButton>Удалить</DeleteButton>
                                    </TodoItem>
                                ))
                                : <p>Ещё нет ни одного списка. Создайте свой первый!</p>
                        }}
                    </Await>
                </React.Suspense>
            </ListContainer>
            {
                fetcher.data?.error &&
                <ErrorComponent message={fetcher.data?.error || 'Произошла ошибка. Пожалуйста, попробуйте снова.'} />
            }
            <Button
                style={{ margin: '1rem auto', width: '100%' }}
                disabled={fetcher.state === "submitting"}
                onClick={addTodoList}
            >
                Создать
            </Button>
        </Container>
    );
};

export default TodoList;
