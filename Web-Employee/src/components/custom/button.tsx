import {FC } from 'react';	

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    hover?: boolean;
    label? : string;
}

const Button: FC<ButtonProps> = ({className, children,...props}) => {
    return (
        <div>
            <button className =  {`pr-4 pt-1 pb-1 pl-4 rounded-2xl  ${className}`} {...props}  >{children}</button>
        </div>
    )
}
export default Button