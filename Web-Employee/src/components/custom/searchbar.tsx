import {FC} from 'react';


interface SearchbarProps extends React.HTMLAttributes<HTMLFormElement>{
    placeholder?: string;
}

const Searchbar: FC<SearchbarProps> = ({className, placeholder, children, ...props}) => {  
    return(
        <form className = {`pr-4 pt-1 pb-1 pl-4 rounded-2xl ${className}`}{...props}>
            <input className=' bg-slate-800'
            type='text'
            placeholder={placeholder} 
            />
        </form>

    )
}

export default Searchbar