import {FC}  from 'react';

interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    active?: boolean;  
}
const NavButton: FC<NavButtonProps> = ({className, children,...props}) => {  
    return (
        <div>
            <button className =  {`p-4 h-15 w-60 pt-4 pb-4 rounded-md text-black text-left ${className}`}{...props}  >{children}</button>
        </div>
    )
}
export default NavButton;

