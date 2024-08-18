import {FC } from 'react';	

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    hover?: boolean;
    label? : string;
}

const Button: FC<ButtonProps> = ({className, children,...props}) => {
    return (
        <div>
            <button className =  {`pr-10 pt-2 pb-1 pl-10 rounded-xl  ${className}`} {...props}  >{children}</button>
        </div>
    )
}
export default Button