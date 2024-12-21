import React from 'react';
import { menuItems } from "../../constants";

const Nav: React.FC = () => {
    return (
        <nav className="hidden lg:flex font-inter font-light self-center w-[60%]">
            <ul className="flex">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a href="#" className="mx-5 transition-all duration-200 hover:bg-clip-text hover:text-secondary">{item}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
