import { ReactNode } from 'react';
import classNames from 'clsx';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type LinkBarProps = {
    title: string;
    route: string;
    icon: ReactNode;
}

export function LinkBar({ title, icon, route }: LinkBarProps) {
    const location = useLocation();
    const isActive = location.pathname.includes(route);
    
    return (
        <li className={classNames('nav-link', { active: isActive })}>
            <Link to={`/${route}`} className="link">
                {icon}
                <span className="text nav-text">{title}</span>
            </Link>
        </li>
    );
}
