import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class HasSubscribePermission implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { person_id, appointment_id } = request.body;
    const subscribed = await this.prisma.personsSubscribeAppointments.findMany({
      where: {
        person_id: person_id,
        appointment_id: appointment_id,
      },
    });
    if (subscribed.length === 0) {
      next();
    } else {
      next(new ConflictException('has been subscribed'));
    }
  }
}
