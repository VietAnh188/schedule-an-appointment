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
                <div className="flex-3">
                    <LocationSearch />
                </div>
            </div>
        </div>
    );
}

export default SearchBar;