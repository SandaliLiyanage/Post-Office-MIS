import {FC} from 'react';


interface SearchbarProps extends React.HTMLAttributes<HTMLFormElement>{
    placeholder?: string;
    label : string;
    type : string;
    width : string;
}

const FormField : FC<SearchbarProps> = ({className, width, label, type, placeholder, children, ...props}) => {  
    return(
        <form className = {`mb-4 mt-4 pr-4 pt-1 pb-1 pl-4  ${className}`} {...props}>
            <label  >{label}
            </label>
            <div>
            <input className={`flex mt-4 pr-4 pt-4 pb-4 pl-4 bg-white rounded-lg text-sm ${width}`}
                type={type} placeholder={placeholder}/>
            </div>
        </form>
    )
}

export default FormField;