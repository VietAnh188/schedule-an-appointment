import { useRef, useId, useEffect, useState } from 'react';
import { CityDto } from '../../dtos/city.dto';
import { ImLocation } from 'react-icons/im';

interface ILocationOption {
    name: string;
    codename: string;
}

function LocationSearch() {
    const componentId = useId();
    const locationButtonRef = useRef<HTMLDivElement>(document.createElement('div'));

    const [cities, setCities] = useState<ILocationOption[]>([]);

    useEffect(() => {
        async function fetchLocations() {
            const response = await fetch('http://localhost:1808/locations');
            return response.json();
        }
        fetchLocations().then((data: CityDto[]) => {
            const cities: ILocationOption[] = [];
            data.forEach(location => {
                cities.push({ name: location.name, codename: location.codename });
            });
            setCities(cities);
        });
        locationButtonRef.current.style.width = `${locationButtonRef.current.offsetHeight}px`;
    }, []);

    return (
        <div className='flex'>
            <div ref={locationButtonRef} className='flex items-center justify-center bg-primary rounded-tl-md rounded-bl-md'>
                <ImLocation className='text-white' />
            </div>
            <select className='w-full p-2 text-md' name="location" id={`${componentId}location`}>
                {cities.map(city => <option key={city.codename} value={city.codename}>{city.name}</option>)}
            </select>
        </div>
    );
}

export default LocationSearch;