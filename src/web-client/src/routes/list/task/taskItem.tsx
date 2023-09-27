import React, { useState } from 'react';
import { Check, CheckCircle, CircleDashed, PencilSimple, Trash } from '@phosphor-icons/react';
import { Input } from '../../../components';
import { Task } from '../../../model';
import { ListItem } from '../styles';
import { ActionButton } from './taskList';

export const TaskItem: React.FC<{ task: Task; }> = ({ task }) => {
    const [item, setItem] = useState(task);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <ListItem style={{ backgroundColor: item.done ? "#9cda9e" : "#ffd993" }}>
            <ActionButton onClick={() => setItem({ ...item, done: !item.done })}>
                {item.done
                    ? <CheckCircle size={30} />
                    : <CircleDashed size={30} />}
            </ActionButton>
            <Input
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                disabled={!isEditing} />
            <ActionButton onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Check size={30} /> : <PencilSimple size={30} />}
            </ActionButton>

            <ActionButton><Trash size={30} /></ActionButton>
        </ListItem>
    );
};
