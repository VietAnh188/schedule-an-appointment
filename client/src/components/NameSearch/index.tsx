import { useRef, forwardRef, useImperativeHandle, Ref } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface IProps {
    handleSubmit: () => void;
}

export interface IForwardRef {
    value(): string;
}

function NameSearch({ handleSubmit }: IProps, forward: Ref<IForwardRef>) {
    const iconButtonRef = useRef<HTMLDivElement>(document.createElement('div'));
    const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

    iconButtonRef.current.style.width = `${iconButtonRef.current.offsetHeight}px`;

    useImperativeHandle(forward, () => ({
        value: () => inputRef.current.value.trim(),
    }));

    return (
        <div className='flex'>
            <div ref={iconButtonRef} className='bg-primary flex items-center justify-center rounded-tl-md rounded-bl-md'>
                <AiOutlineSearch className='text-white' />
            </div>
            <input ref={inputRef} type="text" className='p-2 text-md outline-none flex-3' placeholder='Search Doctors, Lawer, Specialization Etc' />
            <button onClick={handleSubmit} className='flex-1 border-none bg-primary rounded-tr-md rounded-br-md text-white cursor-pointer'>Search</button>
        </div>
    );
}

export default forwardRef(NameSearch);