import { useRef } from 'react';
import LocationSearch, { IForwardRef as IForwardLocationRef } from '../LocationSearch';
import NameSearch, { IForwardRef as IForwardNameRef } from '../NameSearch';

interface IProps {
    amount: number;
}

function SearchBar({ amount }: IProps) {
    const nameRef = useRef<IForwardNameRef>({ value: () => '' });
    const locationRef = useRef<IForwardLocationRef>({ selectedOption: () => '' });

    function handleSearchSubmit() {
        if (nameRef.current.value() !== '' && locationRef.current.selectedOption() !== '') {
            console.log('fetch');
        }
    }

    return (
        <div className="container mx-auto">
            <div className="py-3 flex items-center">
                <div className="flex-2 text-center">
                    <p><b>Showing</b>: <b>{amount}</b> result</p>
                </div>
                <div className="flex flex-3 gap-x-11">
                    <div className='flex-1'>
                        <LocationSearch ref={locationRef} />
                    </div>
                    <div className='flex-1'>
                        <NameSearch ref={nameRef} handleSubmit={handleSearchSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;