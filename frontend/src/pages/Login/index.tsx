import { FormEvent, ReactNode, useState } from "react";
import axios from "axios";

import { useAuth } from "../../app/hooks/useAuth";

import "./styles.css";

type LoginProps = {
    children: ReactNode
}

export function Login({ children }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, login } = useAuth();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
                login(email, password);
            });
            
        } catch(error) {
            console.log(error);
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="d-flex align-items-center justify-content-center login-container">  
            <div className="border-radius rounded-3 login-form">
                <h5 className="mb-4 text-center">Identifique-se</h5>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex flex-column">
                        <label htmlFor="email">USUÁRIO</label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                            className="input-email"
                        />
                    </div>

                    <div className="mb-4 d-flex flex-column">
                        <label htmlFor="password">SENHA</label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Senha"
                            onChange={(event) => setPassword(event.target.value)}
                            className="input-password"
                        />
                    </div>

                    <div>
                        <button
                            className="w-100 rounded-2 btn btn-primary"
                            type="submit"
                        >
                            ENTRAR
                        </button>
                    </div>
                 </form>
            </div>
        </div>
    );
}