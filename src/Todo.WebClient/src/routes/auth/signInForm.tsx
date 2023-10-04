import { useFetcher } from "react-router-dom";
import { InputGroup, Label, Input } from "./../../components";
import { Button, BaseLink, ErrorComponent } from "../../components";


export const SignInForm: React.FC = () => {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="post" action="/signin">
            <InputGroup>
                <Label htmlFor="username">Логин</Label>
                <Input type="text" id="input-username" name="username" required />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="input-password" name="password" required />
            </InputGroup>

            <Button
                style={{ width: '100%' }}
                type="submit"
                disabled={fetcher.state === "submitting"}
            >
                Войти
            </Button>

            <ErrorComponent>{fetcher.data?.error}</ErrorComponent>

            <BaseLink to={'/signup'}>
                <p>Нет аккаунта? Зарегистрироваться</p>
            </BaseLink>
        </fetcher.Form>
    );
};
