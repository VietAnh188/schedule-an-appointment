import { PrismaService } from '../../modules/prisma/prisma.service';

export class IsOwnerPermission {
    constructor (private prisma: PrismaService) { }

    async execute(person_id: string, appointment_id: string) {
        const appointment = await this.prisma.appointment.findUnique({
            where: {
                id: appointment_id,
            },
            select: {
                person_id: true,
            },
        });
        return appointment.person_id === person_id;
    }
}
