import { styled } from "styled-components";
import { loading } from "./loading";

export const Button = styled.button`
    width: 100%;
    padding: 0.7rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: large;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        filter: brightness(0.8);
    }

    &:disabled {
        ${loading}
    }
`;