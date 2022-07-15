import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CityDto } from './dto/city.dto';

@Injectable()
export class LocationsService {
  private readonly locationsJsonPath: string = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'data',
    'locations.json',
  );

  getLocations(): CityDto[] {
    return JSON.parse(fs.readFileSync(this.locationsJsonPath).toString());
  }

  getCities(inputValue: string) {
    const locations = this.getLocations();
    const cities: CityDto[] = [];
    locations.forEach((city) => {
      if (
        city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        city.codename.includes(inputValue.toLowerCase())
      ) {
        cities.push(city);
      }
    });
    return cities;
  }
}
