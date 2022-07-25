import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ResultList from "../../components/ResultList";
import { AppointmentDto } from '../../dtos/appointment.dto';

function SearchResult() {
    const [searchResponses, setSearchResponses] = useState<AppointmentDto[]>([]);

    async function fetchSearch() {
        const response = await fetch('http://localhost:1808/appointments');
        return response.json();
    }

    useEffect(() => {
        fetchSearch().then(data => setSearchResponses(data));
    }, []);

    return (
        <div>
            <Header nav />
            <div className="container py-3 flex mx-auto gap-x-8">
                <div className='flex-2 border-2 rounded-md shadow-md'>
                    <ResultList data={searchResponses} />
                </div>
                <div className="flex-1 shadow-md">2</div>
            </div>
        </div>
    );
}

export default SearchResult;