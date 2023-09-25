import React from 'react';
import { Outlet, useFetcher } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start; 
    flex: 1;
    overflow-y: auto;
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
                    <Button style={{
                        backgroundColor: '#f44336',
                        fontSize: 'medium'
                    }}
                        type='submit'
                    >
                        Выйти
                    </Button>
                </fetcher.Form>
            </Header>
            <Content>
                <Outlet />
            </Content>
        </MainContainer>
    );
};

export default Layout;
