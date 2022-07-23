import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountsService } from '../accounts/accounts.service';
import { ILoginInput } from './interface/login-input.interface';
import { IRegisterInput } from './interface/register-input.interface';
import { PersonsService } from '../persons/persons.service';
import * as bcrypt from 'bcrypt';
import { CachesService } from '../caches/caches.service';

@Controller('auths')
export class AuthsController {
  constructor(
    private accountsService: AccountsService,
    private personsService: PersonsService,
    private cachesService: CachesService,
  ) {}

  @Post('register')
  async register(@Body() body: IRegisterInput, @Res() response: Response) {
    try {
      const { username, email, password } = body;
      const person = await this.personsService.createOne();
      const account = await this.accountsService.createOne({
        username,
        email,
        password,
      });
      await this.personsService.connectTo(person, account);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `${person.id} has been created`,
      });
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() body: ILoginInput, @Res() response: Response) {
    try {
      const existedInCache = await this.cachesService.getFromCache('user');
      if (existedInCache) {
        return response.status(HttpStatus.OK).json(JSON.parse(existedInCache));
      }
      const { email, password } = body;
      const account = await this.accountsService.findOne({ email });
      if (!bcrypt.compareSync(password, account.password))
        await Promise.reject({ status: HttpStatus.FORBIDDEN });
      account.password = undefined;
      await this.cachesService.addToCache('user', JSON.stringify(account), 10);
      return response.status(HttpStatus.OK).json(account);
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'email or password wrong',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      throw new InternalServerErrorException();
    }
  }
}
