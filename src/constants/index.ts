import { FaHome, FaShoppingBag, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';

export const menuItems = [
    "Home",
    "Features",
    "Template",
    "Document",
    "Library"
];

export const sidebarItems = [
    { id: 0,name: "Home", icon: FaHome }, 
    { id: 1,name: "Product", icon: FaShoppingBag },
    { id: 2,name: "Face setting", icon: FaUserAlt },
    { id: 3,name: "Sign out", icon: FaSignOutAlt }
];

export const branches = [
    "Computer",
    "Headset",
    "Android smartphones",
    "Apple smartphones",
    "Keyboard and mouse",
    "Tablets"
];

export const stars = Array.from({ length: 5 }, (_, i) => i + 1);

export const API_URL = "https://ut-zmtt.onrender.com/";
