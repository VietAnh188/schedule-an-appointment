import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('banners')
  getBanners(@Res() response: Response) {
    const banners: string[] = this.imagesService.getBanners();
    if (!banners.length) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "can't get banner, because no one is existing!",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return response.status(HttpStatus.OK).json(banners);
  }
}
