import { FormEvent, ReactNode, useState } from "react";
import axios from "axios";

import { useAuth } from "../../app/hooks/useAuth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

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
            <div className="border-radius rounded-2 login-form">
                <h5 className="mb-3 font-weight-bold">Idenfique-se</h5>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Insira seu e-mail"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Insira sua senha"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Row className="d-flex align-items-center justify-content-center">
                        <Button
                            variant="primary"
                            className="w-50"
                            type="submit"
                        >
                            Entrar
                        </Button>
                    </Row>
                 </Form>
            </div>
        </div>
    );
}