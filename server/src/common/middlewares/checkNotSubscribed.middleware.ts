import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HasSubscribePermission } from '../permissions/hasSubscribe.permission';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class CheckNotSubscribedMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { person_id, appointment_id } = request.body;
    const hasSubscribePermission = new HasSubscribePermission(this.prisma);
    const hasSubscribe = await hasSubscribePermission.execute(
      person_id,
      appointment_id,
    );
    if (hasSubscribe) {
      next();
    } else {
      next(new ConflictException('has not been subscribed'));
    }
  }
}
