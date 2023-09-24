import { Form } from "react-router-dom";
import { InputGroup, Label, Input, Button } from "./components";

export const RegistrationForm: React.FC = () => {
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

            <InputGroup>
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input type="password" id="confirmPassword" required />
            </InputGroup>

            <Button type="submit">Зарегистрироваться</Button>
        </Form>
    );
};
