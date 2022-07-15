import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Response } from 'express';
import { CityDto } from './dto/city.dto';
import { EDivision_Type } from './enum/division-type.enum';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  getLocations(@Res() response: Response) {
    const locations = this.locationsService.getLocations();
    return response.status(HttpStatus.OK).json(locations);
  }

  @Get(':division_type')
  getLocationsWithDivisionType(@Param() params, @Res() response: Response) {
    const { division_type } = params;
    const locations = this.locationsService.getLocations();
    if (division_type === EDivision_Type.CENTRAL) {
      return response
        .status(HttpStatus.OK)
        .json(
          locations.filter(
            (city) => city.division_type === 'thành phố trung ương',
          ),
        );
    }
    if (division_type === EDivision_Type.PROVINCE) {
      return response
        .status(HttpStatus.OK)
        .json(locations.filter((city) => city.division_type === 'tỉnh'));
    }
  }

  @Get('cities/:city_name')
  getCities(@Param() params, @Res() response: Response) {
    const cities: CityDto[] = this.locationsService.getCities(params.city_name);
    if (!cities.length)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No one cities found',
        },
        HttpStatus.NOT_FOUND,
      );
    return response.status(HttpStatus.OK).json(cities);
  }
}
