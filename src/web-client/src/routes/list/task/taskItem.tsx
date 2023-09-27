import React, { useState } from 'react';
import { Check, CheckCircle, CircleDashed, PencilSimple, Trash } from '@phosphor-icons/react';
import { Input } from '../../../components';
import { Task } from '../../../model';
import { ListItem } from '../styles';
import { styled } from 'styled-components';
import { useFetcher, useFormAction } from 'react-router-dom';


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
    const [item, setItem] = useState(task);
    const [isEditing, setIsEditing] = useState(false);
    const fetcher = useFetcher();

    const status = fetcher.formData?.get("status") || (task.done ? "complete" : "incomplete");
    const isComplete = status === "complete";

    return (
        <fetcher.Form action={`${task.id}/update`} method='put'>
            <input hidden name="id" value={item.id} readOnly />
            <input hidden name="status" value={item.done ? "complete" : "incomplete"} readOnly />
            <input hidden name="name" value={item.name} readOnly />

            <ListItem style={{ backgroundColor: isComplete ? "#9cda9e" : "#ffd993" }}>
                <ActionButton onClick={() => setItem({ ...item, done: !item.done })}>
                    {
                        isComplete
                            ? <CheckCircle size={30} />
                            : <CircleDashed size={30} />
                    }
                </ActionButton>

                <Input
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                    disabled={!isEditing}
                />

                <ActionButton
                    onClick={(e) => {
                        if (!isEditing) e.preventDefault();
                        setIsEditing(!isEditing)
                    }}
                >
                    {
                        isEditing
                            ? <Check size={30} />
                            : <PencilSimple size={30} />
                    }
                </ActionButton>
                <ActionButton formAction={useFormAction("delete")}>
                    <Trash size={30} />
                </ActionButton>
            </ListItem>
        </fetcher.Form>
    );
};
