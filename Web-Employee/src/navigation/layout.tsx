import Nav from './header';
import { Outlet } from 'react-router-dom';
import SidebarComponent from './sidebarcomponent';

const Layout = () => {
    const ROLE = 'Post Master'
    
    return (
        <div>
            {ROLE === 'Post Master' && 
            <>
                <Nav />
                <SidebarComponent />
                <Outlet />
            </>
            
            } 
                
        </div>
    )
}

export default Layout