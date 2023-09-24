import { useState } from "react";

import styled from 'styled-components';
import { LoginForm } from "./loginForm";
import { RegistrationForm } from "./registrationForm";


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
    max-width: 300px;
    margin: 5rem auto;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 1rem;
    margin-top: 0;
`;

const SwitchMode = styled.p`
    margin-top: 1rem;
    text-align: center;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const AuthPage: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <PageContainer>
            <AuthContainer>
                <Title>To-do App!</Title>

                {isLoginMode ? <LoginForm /> : <RegistrationForm />}

                <SwitchMode onClick={() => setIsLoginMode(!isLoginMode)}>
                    {isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </SwitchMode>
            </AuthContainer>
        </PageContainer>
    );
};

export default AuthPage;