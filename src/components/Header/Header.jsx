import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHeader = () => {
        setIsOpen(!isOpen);
    };
    const closeHeader = () => {
        setIsOpen(false);
    };


    return (
        <nav className='w-full bg-violet-700 text-white p-4 flex justify-between items-center z-50'>
            <div className='text-2xl text-white font-bold'>
                <Link to="/" onClick={closeHeader}>iTask</Link>
            </div>
            {!isOpen && (
                <div className='md:hidden'>
                    <button className='text-4xl' onClick={toggleHeader}>&#8801;</button>
                </div>
            )}
            <ul className={`md:flex font-semibold ${isOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0 md:space-x-8`}>
                <li>
                    <Link to="/" className='block py-2 pr-4 pl-3 duration-200 text-gray-300 hover:text-rose-50 font-bold' onClick={closeHeader}>
                        
                    </Link>
                </li>
            </ul>
        </nav>
    );
};



export default Header