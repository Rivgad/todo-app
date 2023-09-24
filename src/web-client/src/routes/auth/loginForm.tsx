import { Form } from "react-router-dom";
import { InputGroup, Label, Input, Button } from "./components";

export const LoginForm: React.FC = () => {
    return (
        <Form>
            <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" required />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="password" required />
            </InputGroup>

            <Button type="submit">Войти</Button>
        </Form>
    );
};
