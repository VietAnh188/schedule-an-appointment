import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment } from '@prisma/client';
import {
    EStatus,
    IAdjustSubscribe,
} from './interface/adjust-subscribe.interface';

@Injectable()
export class AppointmentsService {
    constructor (private prisma: PrismaService) { }

    async deleteAppointment(appointment_id: string) {
        await this.prisma.personsSubscribeAppointments.deleteMany({
            where: {
                appointment: {
                    id: appointment_id
                }
            }
        });
        await this.prisma.appointment.delete({
            where: {
                id: appointment_id
            }
        });
    }

    async adjustSubscribed({ status, target }: IAdjustSubscribe) {
        switch (status) {
            case EStatus.INCREASE:
                await this.prisma.appointment.update({
                    where: {
                        id: target.appointment_id,
                    },
                    data: {
                        subscribed: target.value + 1,
                    },
                });
                break;
            case EStatus.DECREASE:
                await this.prisma.appointment.update({
                    where: {
                        id: target.appointment_id,
                    },
                    data: {
                        subscribed: target.value - 1,
                    },
                });
                break;
        }
    }

    async findOne(appointment_id: string) {
        return await this.prisma.appointment.findUnique({
            where: {
                id: appointment_id,
            },
        });
    }

    async unsubscribe(person_id: string, appointment_id: string) {
        const personsSubscribeAppointments =
            await this.prisma.personsSubscribeAppointments.findMany({
                where: {
                    person_id,
                    appointment_id,
                },
            });
        await this.prisma.personsSubscribeAppointments.delete({
            where: {
                id: personsSubscribeAppointments[0].id,
            },
        });
    }

    async subscribe(person_id: string, appointment_id: string) {
        await this.prisma.personsSubscribeAppointments.create({
            data: {
                person: {
                    connect: {
                        id: person_id,
                    },
                },
                appointment: {
                    connect: {
                        id: appointment_id,
                    },
                },
            },
        });
    }

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
