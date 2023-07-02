import { ReactNode } from "react";

import { useAuth } from "../../app/hooks/useAuth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.css";
import { Row } from "react-bootstrap";

type LoginProps = {
    children: ReactNode
}

export function Login({ children }: LoginProps) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="d-flex align-items-center justify-content-center login-container" style={{ minHeight: "100vh" }}>  
            <div className="border-radius rounded-2 login-form">
                <h5 className="mb-3 font-weight-bold">Indenfique-se</h5>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Insira seu e-mail" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Insira sua senha" />
                    </Form.Group>

                    <Row className="d-flex align-items-center justify-content-center">
                        <Button variant="primary" type="submit" className="w-50">
                            Entrar
                        </Button>
                    </Row>
                 </Form>
            </div>
        </div>
    );
}