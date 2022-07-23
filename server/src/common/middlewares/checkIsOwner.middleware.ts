import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from "src/modules/prisma/prisma.service";
import { IsOwnerPermission } from "../permissions/isOwner.permission";

@Injectable()
export class CheckIsOwnerMiddleware implements NestMiddleware {
    constructor (private prisma: PrismaService) { }

    async use(request: Request, response: Response, next: NextFunction) {
        const { person_id, appointment_id } = request.body;
        const isOwnerPermission = new IsOwnerPermission(this.prisma);
        const isOwner = await isOwnerPermission.execute(person_id, appointment_id);
        if (isOwner) {
            next();
        } else {
            next(new ForbiddenException('person is not owner'));
        }
    }
}