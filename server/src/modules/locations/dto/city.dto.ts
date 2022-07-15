import { LocationBaseDto } from './location-base.dto';
import { DistrictDto } from './district.dto';

export class CityDto extends LocationBaseDto {
  phone_code: number;
  image: string;
  districts: DistrictDto[] | [];
}
