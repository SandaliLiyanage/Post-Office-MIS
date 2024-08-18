import { FC } from 'react';

interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
    type:string;
    placeholder:string;
    name:string;
    value: string;
}

const InputField: FC<InputFieldProps> = ({className, name, type, placeholder}) => {
    return (
        <div className='flex justify-between'>
            <input className={`flex-grow ml-4 mt-4 pr-4 pt-4 pb-4 pl-4 bg-white rounded-lg text-sm ${className}`}
                name={name} type={type} placeholder={placeholder}/>
        </div>
    )
}
export default InputField;