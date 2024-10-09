import { useState } from 'react';


import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdAddCircleOutline, MdMenuOpen, MdOutlineManageSearch } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';
import { getToken } from '../../helper/sessionHelper';

const Sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const { pathname } = useLocation();
    return (
        <>
            <aside
                className={` bg-sideBarColor text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-14'
                    }`}>
                <div className="flex justify-between items-center p-4 gap-8">
                    <div className={`text-2xl font-bold ${!isSidebarOpen && 'hidden'}`}>
                        <NavLink to={"/"} > <p className=''>Portfilio</p></NavLink>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="text-white focus:outline-none"
                    >
                        {isSidebarOpen ? <IoCloseCircleOutline className='text-4xl' /> : <MdMenuOpen className='text-3xl' />}
                    </button>
                </div>
                <nav className="mt-10 space-y-4">
                    <ul>
                        <li>
                            <NavLink
                                to="/dashboard/project-create"
                                className={` ${pathname==="/dashboard/project-create" ? ` bg-[#55679C] text-white ` : `bg-white text-[#4040f6]` } px-3 flex py-2 justify-start items-center w-full
                                hover:shadow-lg hover:shadow-indigo-500/300 hover:bg-indigo-500/100 rounded-lg hover:text-white text-lg  `}
                                activeClassName="bg-indigo-900 shadow-lg"
                            >
                                <MdOutlineManageSearch className='font-bold text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                                    <p className='font-bold ml-3 '>Project Create</p>
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/all-projects"
                                className={` ${pathname==="/dashboard/all-projects" ? ` bg-[#55679C] text-white ` : `bg-white text-[#4040f6]` } px-3 flex py-2 justify-start items-center w-full
                                hover:shadow-lg hover:shadow-indigo-500/300 hover:bg-indigo-500/100 rounded-lg hover:text-white text-lg my-6 `}
                                activeClassName="bg-indigo-900 shadow-lg"
                            >
                                <MdOutlineManageSearch className='font-bold text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                                    <p className='font-bold ml-3 '>All Projects</p>
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;