import React, { useState } from 'react';
import { Check, CheckCircle, CircleDashed, Trash } from '@phosphor-icons/react';
import { Input } from '../../../components';
import { TodoItem } from '../../../model';
import { ListItem } from '../styles';
import { styled } from 'styled-components';
import { useFetcher } from 'react-router-dom';


const ActionButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.3s ease-in-out;

    &:hover {
        color: #007bff;
    }
`;

export const TaskItem: React.FC<{ task: TodoItem; }> = ({ task }) => {
    const fetcher = useFetcher();
    const [name, setName] = useState(task.name);
    const [status, setStatus] = useState(task.status);

    return (
        <ListItem style={{ backgroundColor: status == "Finished" ? "#9cda9e" : "#ffd993" }}>
            <fetcher.Form
                action={`${task.id}/update`}
                method="put"
                style={{ display: "inherit", flex: 1 }}
                onSubmit={(e) => {
                    e.preventDefault();
                    fetcher.submit(
                        { id: task.id, name: name, status: status },
                        { action: `${task.id}/update`, method: "put" }
                    )
                }}
            >
                <input hidden defaultValue={status} name="status" />

                <ActionButton onClick={() => {
                    setStatus(status === "Finished" ? "Unfinished" : "Finished");
                }}>
                    {
                        status == "Finished"
                            ? <CheckCircle size={30} />
                            : <CircleDashed size={30} />
                    }
                </ActionButton>

                <Input
                    type="text"
                    name="name"
                    value={name}
                    maxLength={300}
                    onChange={(e) => setName(e.target.value)}
                />

                <ActionButton type="submit">
                    <Check size={30} />
                </ActionButton>
            </fetcher.Form>

            <fetcher.Form action={`${task.id}/delete`} method="delete">
                <ActionButton type='submit'>
                    <Trash size={30} />
                </ActionButton>
            </fetcher.Form>
        </ListItem>
    );
};
