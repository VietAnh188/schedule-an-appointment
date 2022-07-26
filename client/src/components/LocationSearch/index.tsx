import { useRef, useId, useEffect, useState, forwardRef, useImperativeHandle, Ref } from 'react';
import { CityDto } from '../../dtos/city.dto';
import { ImLocation } from 'react-icons/im';

interface ILocationOption {
    name: string;
    codename: string;
}

interface IProps {

}

export interface IForwardRef {
    selectedOption(): string;
}

function LocationSearch(_props: IProps, forward: Ref<IForwardRef>) {
    const componentId = useId();

    const buttonRef = useRef<HTMLDivElement>(document.createElement('div'));
    const locationSelectRef = useRef<HTMLSelectElement>(document.createElement('select'));

    const [cities, setCities] = useState<ILocationOption[]>([]);

    useImperativeHandle(forward, () => ({
        selectedOption: () => locationSelectRef.current.value
    }));

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

    buttonRef.current.style.width = `${buttonRef.current.offsetHeight}px`;

    return (
        <div className='flex'>
            <div ref={buttonRef} className='flex items-center justify-center bg-primary rounded-tl-md rounded-bl-md'>
                <ImLocation className='text-white' />
            </div>
            <select ref={locationSelectRef} className='flex-1 p-2 text-md outline-none' name="location" id={`${componentId}location`}>
                {cities.map(city => <option key={city.codename} value={city.codename}>{city.name}</option>)}
            </select>
        </div>
    );
}

export default forwardRef(LocationSearch);