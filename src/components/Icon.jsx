import React from 'react';

// We'll use react-icons for our icon library
// Standardizing on Heroicons (Hi) for consistency
import {
  // Navigation icons
  HiHome,
  HiBookOpen,
  HiClipboardList,
  HiUserGroup,
  HiCog,
  HiLogout,
  HiArrowRight,
  HiPlus,
  HiPencil,
  HiTrash,
  HiBan,
  HiChartBar,
  HiSearch,
  HiMicrophone,
  HiSun,
  HiMoon,
  HiStar,
  HiUser,
  HiCalendar,
  HiLogin,
  HiUserAdd,
  HiOutlineMenu,
  HiOutlineX
} from 'react-icons/hi';

import {
  // Brand icons
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaBookOpen
} from 'react-icons/fa';

import { FaArrowLeft } from 'react-icons/fa6';

// Icon mapping for consistent usage across the app
const iconMap = {
  // Navigation
  home: HiHome,
  books: HiBookOpen,
  categories: HiClipboardList,
  users: HiUserGroup,
  settings: HiCog,
  logout: HiLogout,
  login: HiLogin,
  userAdd: HiUserAdd,
  arrowRight: HiArrowRight,
  arrowLeft: FaArrowLeft,
  plus: HiPlus,
  edit: HiPencil,
  trash: HiTrash,
  ban: HiBan,
  chart: HiChartBar,
  search: HiSearch,
  microphone: HiMicrophone,
  sun: HiSun,
  moon: HiMoon,
  star: HiStar,
  user: HiUser,
  calendar: HiCalendar,
  menu: HiOutlineMenu,
  x: HiOutlineX,
  
  // Brands
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
  bookOpen: FaBookOpen
};

/**
 * Standardized Icon component for consistent icon usage across the app
 * @param {string} name - Name of the icon to display
 * @param {string} size - Size of the icon (default: 'md')
 * @param {string} color - Color class for the icon (default: 'currentColor')
 * @param {object} props - Additional props to pass to the icon component
 */
const Icon = ({ name, size = 'md', color = 'currentColor', className = '', ...props }) => {
  // Size mapping
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10'
  };

  // Get the icon component from the map
  const IconComponent = iconMap[name];
  
  // If icon not found, return null or a fallback
  if (!IconComponent) {
    console.warn(`Icon '${name}' not found in icon map`);
    return null;
  }

  // Combine classes
  const combinedClasses = `${sizeClasses[size] || sizeClasses.md} ${color} ${className}`;

  return <IconComponent className={combinedClasses} {...props} />;
};

export default Icon;