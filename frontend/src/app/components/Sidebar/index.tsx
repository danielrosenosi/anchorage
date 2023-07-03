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
        <div className="container d-flex">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h5 className="logo">Sidebar</h5>

                    <div className="bars">
                        <FaBars />
                    </div>
                </div>
                
                <NavLink to="/" className="link" >
                    <div className="icon">
                        <BiHomeAlt2 />
                    </div>

                    <div className="link-text">
                        Home
                    </div>
                </NavLink>
            </div>
            
            <div className="w-100">
                {children}
            </div>
        </div>
    );
};