import Nav from './header';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const Layout = () =>{
    return (
        <div>
        <Sidebar />
            <Nav />
            <Outlet />
        </div>
    )};
export default Layout