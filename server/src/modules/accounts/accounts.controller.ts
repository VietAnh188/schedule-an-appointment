import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  async findAll(@Res() response: Response) {
    return response
      .status(HttpStatus.OK)
      .json(await this.accountsService.findAll());
  }
}
