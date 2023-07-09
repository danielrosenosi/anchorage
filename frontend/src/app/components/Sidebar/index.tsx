import { FiChevronRight } from 'react-icons/fi';
import { SlSettings } from 'react-icons/sl';
import { BiHomeAlt2 } from 'react-icons/bi';
import { SlLogout } from 'react-icons/sl';
import { SlPeople } from 'react-icons/sl';

import { LinkBar } from './LinkBar';
import { useAuth } from '../../hooks/useAuth';
import { SidebarProps } from '../../@types/sidebar';

import './styles.css';

export function Sidebar({ children }: SidebarProps) {
    const { logout } = useAuth();

    async function handleLogout() {
        logout();
    }

    function closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const pageContent = document.querySelector('.page-content');
        
        sidebar?.classList.toggle('close');
        pageContent?.classList.toggle('full');
    }

    return (
        <>
            <div className="sidebar close">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="images/logo.jpg" alt="logo" />
                        </span>

                        <div className="text header-text">
                            <span className="name">Anchorage</span>
                        </div>
                    </div>

                    <FiChevronRight className="toggle" onClick={closeSidebar}/>
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links p-0">
                            <LinkBar
                                title="Dashboard"
                                route="dashboard"
                                icon={<BiHomeAlt2 className="icon" />}
                            />

                            <LinkBar
                                title="Pacientes"
                                route="pacientes"
                                icon={<SlPeople className="icon" />}
                            />

                            <LinkBar
                                title="Configurações"
                                route="configuracoes"
                                icon={<SlSettings className="icon" />}
                            />
                        </ul>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <button
                        type="button"
                        className="btn-logout"
                        onClick={handleLogout}
                    >
                        <SlLogout />
                        <span className="text ms-2">Sair</span>
                    </button>
                </div>
            </div>

            <div className="page-content full">
                {children}
            </div>
        </>
    );
};