import React from 'react';
import { Check, CheckCircle, CircleDashed, Trash } from '@phosphor-icons/react';
import { Input } from '../../../components';
import { Task } from '../../../model';
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

export const TaskItem: React.FC<{ task: Task; }> = ({ task }) => {
    const fetcher = useFetcher();
    const { id, name, status } = fetcher.formData?.get("task") as Task | null ?? task;

    return (
        <ListItem style={{ backgroundColor: status == "Finished" ? "#9cda9e" : "#ffd993" }}>
            <fetcher.Form
                action={`${task.id}/update`}
                method="put"
                style={{ display: "inherit", flex: 1 }}
            >
                <input hidden defaultValue={status} name="status" />

                <ActionButton onClick={(e) => {
                    e.preventDefault();
                    fetcher.submit(
                        { id: id, name: name, status: status == "Unfinished" ? "Finished" : "Unfinished" },
                        { action: `${id}/update`, method: "put" }
                    )
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
                    defaultValue={name}
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
