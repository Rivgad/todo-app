import React from 'react';
import { Outlet, useFetcher } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    background-color: #f4f4f4;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
    color: #fff;
`;

const HeaderTitle = styled.div`
    font-size: 1.5rem;
`;

const LogoutButton = styled.button`
    background-color: #f44336;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #d32f2f;
    }
`;

const Content = styled.main`
    display: flex;
    justify-content: center;
    align-items: top;
    flex-grow: 1;
`;

const Layout: React.FC = () => {
    const fetcher = useFetcher()

    return (
        <MainContainer>
            <Header>
                <HeaderTitle>
                    Todo App
                </HeaderTitle>
                <fetcher.Form action='/logout'>
                    <LogoutButton type='submit'>
                        Выйти
                    </LogoutButton>
                </fetcher.Form>
            </Header>
            <Content>
                <Outlet />
            </Content>
        </MainContainer>
    );
};

export default Layout;
