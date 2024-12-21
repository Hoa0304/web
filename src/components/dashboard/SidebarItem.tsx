import React from 'react';
import { SidebarItem as SidebarItemType } from '../../types/home.types';
import { useNavigate } from 'react-router-dom';

interface SidebarItemProps {
    item: SidebarItemType;
    isActive: boolean;
    onSignOut: () => void;
    onClick: () => void; 
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isActive, onSignOut, onClick }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        onSignOut();
        navigate('/');  
    };

    return (
        <li
            key={item.id}
            className={`py-1 flex w-44 items-center p-2 mb-4 cursor-pointer ${isActive
                ? 'bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] rounded'
                : 'border duration-300 border-white hover:bg-gradient-to-r hover:from-[#CD46D9] hover:to-[#27C5C9] hover:rounded hover:opacity-95 hover:scale-90 hover:border-none'
                }`}
            onClick={item.name === "Sign out" ? handleSignOut : onClick} 
        >
            <span className="mr-5 bg-transparent">
                {React.createElement(item.icon, { className: "bg-transparent" })}
            </span>
            <span className="bg-transparent">{item.name}</span>
        </li>
    );
};

export default SidebarItem;
