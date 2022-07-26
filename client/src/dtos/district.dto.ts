import { LocationBaseDto } from "./location-base.dto";
import { WardDto } from "./ward.dto";

export class DistrictDto extends LocationBaseDto {
    readonly short_codename: string;
    readonly ward: WardDto[];

    constructor (short_codename: string, wards: WardDto[], location_base: LocationBaseDto) {
        super(location_base.name, location_base.code, location_base.codename, location_base.division_type);
        this.short_codename = short_codename;
        this.ward = wards;
    }
}