import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useFetcher } from 'react-router-dom';
import { Button, ErrorComponent, Input } from '../../../components';


export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;


export const TaskForm: React.FC = () => {
    const [text, setText] = useState('');
    const fetcher = useFetcher();

    return (
        <fetcher.Form action={`create`} method='post'>
            <InputContainer>
                <Input
                    style={{ flex: 1 }}
                    type="text"
                    name='name'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите текст..." />
                <Button
                    disabled={fetcher.state == "submitting"}
                    type='submit'
                    style={{ marginLeft: "1rem" }}
                >
                    Добавить пункт
                </Button>
            </InputContainer>
            <ErrorComponent>{fetcher.data?.error}</ErrorComponent>
        </fetcher.Form>
    );
};
