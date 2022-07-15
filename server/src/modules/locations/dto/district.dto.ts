import { LocationBaseDto } from './location-base.dto';
import { WardDto } from './ward.dto';

export class DistrictDto extends LocationBaseDto {
  short_codename: string;
  ward: WardDto[] | [];
}