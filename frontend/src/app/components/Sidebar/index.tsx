import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { SlLogout } from 'react-icons/sl';
import { SlPeople } from 'react-icons/sl';
import { BiHomeAlt2 } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';

import { useAuth } from '../../hooks/useAuth';

import './styles.css';

type SidebarProps = {
    children: ReactNode;
}

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
                            <li className="nav-link">
                                <Link to="/dashboard" className="link">
                                    <BiHomeAlt2 className="icon" />
                                    <span className="text nav-text">Dashboard</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to="/pacientes" className="link">
                                    <SlPeople className="icon" />
                                    <span className="text nav-text">Pacientes</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to="/usuarios" className="link">
                                    <SlPeople className="icon" />
                                    <span className="text nav-text">Usuários</span>
                                </Link>
                            </li>
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