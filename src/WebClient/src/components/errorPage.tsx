import { useNavigate } from "react-router-dom";
import { Button, ErrorBoundry } from ".";
import styled from "styled-components";

const Container = styled.div`
    justify-items: center;
    align-items: initial;
    display: flex;
    flex-direction: column;
`

export const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <h1>Упссс!</h1>
            <p>Простите, произошла непредвиденая ошибка.</p>
            <ErrorBoundry/>
            <Button onClick={() => navigate(-1)}>Назад</Button>
        </Container>
    );
}
