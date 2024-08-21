import Nav from './header';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const Layout = () =>{
    return (
        <div>
        <Sidebar />
        <div>
            <Nav />
            <div>
            <Outlet />
            </div>
        </div>
        </div>
    )};
export default Layout