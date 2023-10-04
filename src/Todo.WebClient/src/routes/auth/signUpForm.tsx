import { useFetcher } from "react-router-dom";
import { InputGroup, Label, Input } from "./../../components";
import { Button, BaseLink, ErrorComponent } from "../../components";


export const SignUpForm: React.FC = () => {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="post" action="/signup">
            <InputGroup>
                <Label htmlFor="username">Логин</Label>
                <Input type="text" id="input-username" name="username" required />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="input-password" name="password" required />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input type="password" id="input-confirmPassword" name="confirmPassword" required />
            </InputGroup>

            <ErrorComponent>{fetcher.data?.error}</ErrorComponent>

            <Button
                style={{ width: '100%' }}
                type="submit"
                disabled={fetcher.state === "submitting"}
            >
                Зарегистрироваться
            </Button>

            <BaseLink to={'/signin'}>
                <p>Уже есть аккаунт? Войти</p>
            </BaseLink>
        </fetcher.Form>
    );
};
