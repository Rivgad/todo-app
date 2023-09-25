import styled from 'styled-components';

const ErrorBox = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    font-size: 0.9rem;
`;

export const ErrorComponent: React.FC<{ message: string; }> = ({ message }) => {
    return <ErrorBox>{message}</ErrorBox>;
};
