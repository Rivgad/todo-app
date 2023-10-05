import React from 'react';
import { Outlet, useFetcher } from 'react-router-dom';
import styled from 'styled-components';
import { RedButton } from '../components';
import { Link } from 'react-router-dom';
import { House } from '@phosphor-icons/react';

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

const HeaderLink = styled(Link)`
    color: inherit;
    transition: color 0.3s ease;
    display: flex;
`

const NavPanel = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const Layout: React.FC = () => {
    const fetcher = useFetcher()

    return (
        <MainContainer>
            <Header>
                <NavPanel>
                    <HeaderTitle>
                        Todo App
                    </HeaderTitle>
                    <HeaderLink to="/">
                        <House size={30}/>
                    </HeaderLink>
                </NavPanel>
                <fetcher.Form action='/logout'>
                    <RedButton type='submit'>
                        Выйти
                    </RedButton>
                </fetcher.Form>
            </Header>
            <Content>
                <Outlet />
            </Content>
        </MainContainer>
    );
};

export default Layout;
