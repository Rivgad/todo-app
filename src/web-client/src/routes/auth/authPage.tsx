import styled from 'styled-components';
import { Outlet } from "react-router-dom";


export const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    max-width: 25vw;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 1rem;
    margin-top: 0;
`;

export const AuthPage: React.FC = () => {
    return (
        <PageContainer>
            <AuthContainer>
                <Title>To-do App!</Title>

                <Outlet/>
            </AuthContainer>
        </PageContainer>
    );
};

export default AuthPage;