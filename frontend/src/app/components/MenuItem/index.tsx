type MenuItemProps = {
    title: string;
    icon: string;
    link: string;
}

export function MenuItem({ title, icon, link }: MenuItemProps) {
    return (
        <li className="sidebar-menu-item">
            <a href="/" className="sidebar-menu-link">
                <i className="bi bi-house-door-fill"></i>
                <span>Home</span>
            </a>
        </li>
    );
}