import { ReactNode } from 'react';

import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BiHomeAlt2 } from 'react-icons/bi';
 
import './styles.css';

type SidebarProps = {
    children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
    return (
        <>
            <div className="sidebar">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="images/logo.jpg" alt="logo" />
                        </span>

                        <div className="text header-text">
                            <span className="name">Anchorage</span>
                        </div>
                    </div>
                </header>
            </div>
            
            <div className="w-100">
                {children}
            </div>
        </>
    );
};