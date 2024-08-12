import {FC } from 'react';	

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    hover?: boolean;
    label? : string;
}

const Button: FC<ButtonProps> = ({className, children,...props}) => {
    return (
        <div>
            <button className =  {`bg-slate-800 pr-4 pt-1 pb-1 pl-4 rounded-2xl hover:bg-slate-700 ${className}`} {...props}  >{children}</button>
        </div>
    )
}
export default Button