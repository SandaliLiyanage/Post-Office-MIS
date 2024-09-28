import {FC } from 'react';	

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    hover?: boolean;
    label? : string;
    type?: "button" | "submit" | "reset"; 
}

const Button: FC<ButtonProps> = ({type, className, children,...props}) => {
    return (
        <div>
            <button className =  {`pr-10 pt-2 pb-1 pl-10 rounded-xl  ${className}`} type={type} {...props}  >{children}</button>
        </div>
    )
}
export default Button