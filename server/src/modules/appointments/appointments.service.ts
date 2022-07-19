import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async filterByTags(tags: string[]) {
    return await this.prisma.appointment.findMany({
      where: {
        tags: {
          equals: tags,
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.appointment.findMany();
  }

  async createOne(personId: string, appointment: Appointment) {
    await this.prisma.person.update({
      where: {
        id: personId,
      },
      data: {
        appointments: {
          create: {
            title: appointment.title,
            content: appointment.content,
            limit: appointment.limit,
            price: appointment.price,
            tags: appointment.tags,
            start_time: new Date(appointment.start_time),
            end_time: new Date(appointment.end_time),
          },
        },
      },
    });
  }
}
