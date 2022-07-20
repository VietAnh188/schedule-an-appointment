import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class IsOwnerPermission implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(request: Request, _response: Response, next: NextFunction) {
    const { person_id, appointment_id } = request.body;
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointment_id,
      },
      select: {
        person_id: true,
      },
    });
    if (appointment.person_id === person_id) {
      next(new UnauthorizedException('owner has been denied'));
    } else {
      next();
    }
  }
}
