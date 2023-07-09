import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export function Settings() {
    return (
        <Tabs
            defaultActiveKey="account"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="profile" title="Conta">
                Conta
            </Tab>

            <Tab eventKey="users" title="Usuários">
                Usuários
            </Tab>

            <Tab eventKey="roles" title="Perfis">
                Perfis
            </Tab>
        </Tabs>
    );
}