import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IAccountCreateOne } from './interface/account-create-one.interface';
import { IFindUniqueParams } from './interface/find-unique-params.interface';
import * as bcrypt from 'bcrypt';
import { Account } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findOne({ username, email, id }: IFindUniqueParams): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: {
        ...(username && { username }),
        ...(email && { email }),
        ...(id && { id }),
      },
      include: {
        person: true,
      },
    });
    if (!account) await Promise.reject({ status: HttpStatus.FORBIDDEN });
    return account;
  }

  async findAll() {
    return await this.prisma.account.findMany({ where: { active: true } });
  }

  async createOne({ username, password, email }: IAccountCreateOne) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return await this.prisma.account.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
  }
}
