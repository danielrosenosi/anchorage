import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { AiOutlineUserAdd } from "react-icons/ai";

export function Home() {
    return (
        <div className="mx-4 my-4">
            <Button variant="primary">
                <AiOutlineUserAdd/> Paciente
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Condição</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>João</td>
                        <td>Diabetes</td>
                        <td>123.456.789-00</td>
                        <td>
                            <Button variant="primary">Editar</Button>
                            <Button variant="danger">Excluir</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}