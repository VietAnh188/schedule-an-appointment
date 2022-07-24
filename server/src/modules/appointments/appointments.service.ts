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

    /**
     * Delete all personsSubscribeAppointments where the appointment id is equal to the appointment_id,
     * then delete the appointment where the id is equal to the appointment_id.
     * </code>
     * @param {string} appointment_id - string
     */
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

    /**
     * This function is used to update the subscribed field of the appointment table in the database.
     * @param {IAdjustSubscribe}  - IAdjustSubscribe
     */
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

    /**
     * Find a unique appointment by its id.
     * @param {string} appointment_id - string
     * @returns The appointment object
     */
    async findOne(appointment_id: string) {
        return await this.prisma.appointment.findUnique({
            where: {
                id: appointment_id,
            },
        });
    }

    /**
     * It deletes a record from the personsSubscribeAppointments table where the person_id and
     * appointment_id match the ones passed in as arguments.
     * @param {string} person_id - string, appointment_id: string
     * @param {string} appointment_id - string
     */
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

    /**
     * This function creates a new record in the personsSubscribeAppointments table, which is a
     * many-to-many relationship table between the persons and appointments tables, and it connects the
     * person with the id of person_id to the appointment with the id of appointment_id.
     * @param {string} person_id - The id of the person who is subscribing to the appointment
     * @param {string} appointment_id - string
     */
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

    /**
     * Find all appointments where the tags property is equal to the tags array passed in as an
     * argument.
     * @param {string[]} tags - string[]
     * @returns An array of appointments that match the tags.
     */
    async filterByTags(tags: string[]) {
        return await this.prisma.appointment.findMany({
            where: {
                tags: {
                    equals: tags,
                },
            },
        });
    }

    /**
     * Find all appointments where the active field is true.
     * @returns An array of objects.
     */
    async findAllActive() {
        return await this.prisma.appointment.findMany({
            where: {
                active: true
            }
        });
    }

    async findAll() {
        return await this.prisma.appointment.findMany();
    }

    /**
     * Create an appointment for a person with the given personId
     * @param {string} person_id - string
     * @param {Appointment} appointment - Appointment
     */
    async createOne(person_id: string, appointment: Appointment) {
        await this.prisma.person.update({
            where: {
                id: person_id,
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
