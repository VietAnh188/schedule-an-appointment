import { DistrictDto } from "./district.dto";
import { LocationBaseDto } from "./location-base.dto";

export class CityDto extends LocationBaseDto {
    readonly phone_code: number;
    readonly image: string;
    readonly districts: DistrictDto[];

    constructor (phone_code: number, image: string, districts: DistrictDto[], location_base: LocationBaseDto) {
        super(location_base.name, location_base.code, location_base.codename, location_base.division_type);
        this.phone_code = phone_code;
        this.image = image;
        this.districts = districts;
    }
}