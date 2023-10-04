import axios from 'axios';
import Cookies from 'js-cookie'

export interface AuthService {
    isAuthenticated: boolean;
    signin(username: string, password: string): Promise<void>;
    signout(): Promise<void>;
    signup(username: string, password: string): Promise<void>;
}

class _AuthService implements AuthService {
    get isAuthenticated(): boolean {
        return Cookies.get('accessToken') != null
    }

    async signin(username: string, password: string): Promise<void> {
        const response = await axios.post('/api/signin', {
            "username": username,
            "password": password
        })

        const accessToken = response.data.accessToken
        Cookies.set('accessToken', accessToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
    }

    async signout(): Promise<void> {
        Cookies.remove('accessToken')
        delete axios.defaults.headers.common["Authorization"];
    }

    async signup(username: string, password: string): Promise<void> {
        await axios.post('/api/signup', {
            "username": username,
            "password": password
        })
    }
}

export const authService = new _AuthService();