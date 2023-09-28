import { styled } from 'styled-components';
import { Link } from "react-router-dom";

export const BaseLink = styled(Link)`
    margin-top: 1rem;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    color: black;

    &:hover {
        text-decoration: underline;
    }
`;