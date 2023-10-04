import API from './api';

export interface AuthService {
    isAuthenticated: boolean;
    signin(username: string, password: string): Promise<void>;
    signout(): Promise<void>;
    signup(username: string, password: string): Promise<void>;
}

class _AuthService implements AuthService {
    get isAuthenticated(): boolean {
        const token = localStorage.getItem('accessToken');
        return token != null && token !== "";
    }

    async signin(username: string, password: string): Promise<void> {
        const response = await API.post('/api/signin', {
            "username": username,
            "password": password
        })
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
    }

    async signout(): Promise<void> {
        localStorage.removeItem('accessToken')
    }

    async signup(username: string, password: string): Promise<void> {
        await API.post('/api/signup', {
            "username": username,
            "password": password
        })
    }
}

export const authService = new _AuthService();