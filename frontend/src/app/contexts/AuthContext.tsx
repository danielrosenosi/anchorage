import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useState
} from 'react';

import { AuthService } from '../services/auth/AuthService';
import { useEffect } from 'react';

type AuthContextType = {
    logout: () => void;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>
};

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN";

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [accessTokem, setAccessToken] = useState<string>();

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);

        if(result) {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(String(result.token).replace(/['"]+/g, '')));
            setAccessToken(result.token);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setAccessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => !!accessTokem, [accessTokem]);

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if (accessToken) {
            setAccessToken(JSON.parse(accessToken));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};