export class LocationBaseDto {
    readonly name: string;
    readonly code: number;
    readonly codename: string;
    readonly division_type: string;

    constructor (name: string, code: number, codename: string, division_type: string) {
        this.name = name;
        this.code = code;
        this.codename = codename;
        this.division_type = division_type;
    }
}