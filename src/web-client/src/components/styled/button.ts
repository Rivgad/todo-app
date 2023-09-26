import { styled } from "styled-components";
import { loading } from "./loading";

export const Button = styled.button`
    width: auto;
    padding: 0.7rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: medium;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        filter: brightness(0.8);
    }

    &:disabled {
        ${loading}
    }
`;

export const RedButton = styled(Button)`
    background-color: #f44336;
`
