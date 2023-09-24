import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    padding: 0.7rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: large;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
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

