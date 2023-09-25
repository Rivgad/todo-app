import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const loading = css`
    filter: brightness(0.8);
    cursor: progress;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        border: 2px solid #fff;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

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
