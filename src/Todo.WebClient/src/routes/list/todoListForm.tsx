import React from 'react';
import { useFetcher } from 'react-router-dom';
import { Button, Input, InputGroup } from '../../components';

export const TodoListForm: React.FC = () => {
    const fetcher = useFetcher();

    return (
        <fetcher.Form action="/list/create" method="post">
            <InputGroup>
                <Input type="text" placeholder="Название" maxLength={300} id="input-name" name="name" required />
                <Button
                    style={{ margin: '1rem auto', width: '100%' }}
                    disabled={fetcher.state === "submitting"}
                    type="submit"
                >
                    Создать
                </Button>
            </InputGroup>
        </fetcher.Form>
    );
};
