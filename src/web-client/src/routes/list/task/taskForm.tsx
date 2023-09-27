import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import { styled } from 'styled-components';


export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;


export const TaskForm: React.FC = () => {
    const [text, setText] = useState('');

    return (
        <InputContainer>
            <Input
                style={{ flex: 1 }}
                type="text"
                name='name'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст..." />
            <Button type='submit' style={{ marginLeft: "1rem" }}>
                Добавить пункт
            </Button>
        </InputContainer>
    );
};
