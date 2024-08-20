import Nav from './header';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const Layout = () => {    
    return (
        <div>
            <Nav/>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}
export default Layout