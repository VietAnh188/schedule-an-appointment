import { LocationBaseDto } from "./location-base.dto";

export class WardDto extends LocationBaseDto {
    readonly short_codename: string;

    constructor (short_codename: string, location_base: LocationBaseDto) {
        super(location_base.name, location_base.code, location_base.codename, location_base.division_type);
        this.short_codename = short_codename;
    }
}