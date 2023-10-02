import { styled } from "styled-components";
import { RedButton } from "../../components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 35rem;
`;

export const ListContainer = styled.div`
    flex: auto;
    overflow-y: auto;
    overflow-wrap: anywhere;
`;

export const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 0.1rem solid #ddd;
    margin-top: 1rem;
`;

export const DeleteButton = styled(RedButton)`
    overflow-wrap: initial;
`;