import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
  private readonly bannersFolderPath: string = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'public',
    'banners',
  );

  getBanners() {
    return fs.readdirSync(this.bannersFolderPath);
  }
}
