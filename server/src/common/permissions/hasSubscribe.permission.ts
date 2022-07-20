import { PrismaService } from '../../modules/prisma/prisma.service';

export class HasSubscribePermission {
  constructor(private prisma: PrismaService) {}

  async execute(person_id: string, appointment_id: string) {
    const subscribed = await this.prisma.personsSubscribeAppointments.findMany({
      where: {
        person_id: person_id,
        appointment_id: appointment_id,
      },
    });
    return subscribed.length !== 0;
  }
}
