import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Account, Person } from '@prisma/client';

@Injectable()
export class PersonsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        account: true,
      },
    });
  }

  async createOne(security_code?: string) {
    return await this.prisma.person.create({
      data: {
        ...(security_code && { security_code }),
      },
    });
  }

  async connectTo(current: Person, target: Account) {
    await this.prisma.person.update({
      where: {
        id: current.id,
      },
      data: {
        account: {
          connect: {
            id: target.id,
          },
        },
      },
    });
  }
}
