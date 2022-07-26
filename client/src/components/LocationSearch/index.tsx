import { useRef, useEffect, useState } from 'react';
import { CityDto } from '../../dtos/city.dto';

interface ILocationOption {
    name: string;
    codename: string;
}

function LocationSearch() {
    const componentId = useRef();

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
    }, []);

    return (
        <select name="location" id={`${componentId}-location`}>
            {cities.map(city => <option key={city.codename} value={city.codename}>{city.name}</option>)}
        </select>
    );
}

export default LocationSearch;