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

interface Props extends React.PropsWithChildren {
    hideIfUndefined?: boolean;
}

export const ErrorComponent: React.FC<Props> = ({ children, hideIfUndefined=true }) => {
    return (
        <>
            {
                (children || !hideIfUndefined) && <ErrorBox>{children}</ErrorBox>
            }
        </>
    );
};
