import { Link } from "react-router-dom";
import styled from "styled-components";

export const InputGroup = styled.div`
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

export const StyledLink = styled(Link)`
    margin-top: 1rem;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    color: black;

    &:hover {
        text-decoration: underline;
    }
`;
