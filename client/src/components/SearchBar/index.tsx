import LocationSearch from '../../components/LocationSearch';

interface IProps {
    amount: number;
}

function SearchBar({ amount }: IProps) {

    return (
        <div className="container mx-auto">
            <div className="py-3 flex">
                <div className="flex-2 text-center">
                    <p><b>Showing</b>: <b>{amount}</b> result</p>
                </div>
                <div className="flex flex-3 gap-x-11">
                    <div className='flex-1'>
                        <LocationSearch />
                    </div>
                    <div className='flex-1'>
                        2
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;