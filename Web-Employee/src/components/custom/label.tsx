import {FC} from 'react';


interface SearchbarProps extends React.HTMLAttributes<HTMLFormElement>{
    label : string;
}

const LabelField : FC<SearchbarProps> = ({className, label, children, ...props}) => {  
    return(
        <form className = {`mt-4 pr-4 pt-1 pb-1 pl-4  ${className}`} {...props}>
            <label  >{label}
            </label>
        </form>
    )
}

export default LabelField;