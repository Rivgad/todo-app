import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Todo } from '../../services/listService';
import { ErrorComponent } from '../../components/errorComponent';
import { BaseLink, Button } from '../../components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100%;
    justify-content: center;
    align-items: center;
`;

const ListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 0rem 0 2rem;
    padding: 0rem 2rem 0;
    max-width: 80vh;
    width: 100%;
`;

const CustomUl = styled.div`
    display: flex;
    flex-direction: column;
`;

const StikyButton = styled(Button)`
    margin: 1rem;
    max-width: 40rem;
    width: auto;
`

const TodoItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
`;

const TodoItem = (todo: Todo) => (
    <TodoItemContainer key={todo.id}>
        <BaseLink to={`/list/${todo.id}`}>
            {todo.name}
        </BaseLink>
    </TodoItemContainer>
);



const TodoList: React.FC = () => {
    const data = useLoaderData() as { items: Array<Todo> };

    return (
        <Container>
            <ListContainer>
                <React.Suspense fallback={<p>Загрузка...</p>}>
                    <CustomUl>
                        <Await
                            resolve={data.items}
                            errorElement={
                                <ErrorComponent message='Не получилось загрузить список. Попробуйте перезагрузить страницу' />
                            }
                        >
                            {(items: Array<Todo>) => {
                                return items.length !== 0
                                    ? items.map((item) => (
                                        <TodoItem
                                            key={item.id}
                                            id={item.id}
                                            name={item.name}
                                        />
                                    ))
                                    : <p>Ещё нет ни одного списка. Создайте свой первый!</p>
                            }}
                        </Await>
                    </CustomUl>
                </React.Suspense>
            </ListContainer>
            <div style={{justifyContent:'center',  display:'flex'}}>
                <StikyButton>Создать новый</StikyButton>
            </div>
        </Container>
    );
};

export default TodoList;
