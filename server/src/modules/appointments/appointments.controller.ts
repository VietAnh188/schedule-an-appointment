import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    InternalServerErrorException,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PersonsService } from '../persons/persons.service';
import { IAppointmentCreateOne } from './interface/appointment-create-one.interface';
import { IPersonAndAppointmentID } from './interface/person-appointment-id.interface';
import { Response } from 'express';
import { EStatus } from './interface/adjust-subscribe.interface';

@Controller('appointments')
export class AppointmentsController {
    constructor (
        private appointmentsService: AppointmentsService,
        private personsService: PersonsService,
    ) { }

    @Delete()
    /**
     * It takes in a body of type IPersonAndAppointmentID, and a response object, and then it tries to
     * delete an appointment, and if it succeeds, it returns a response with a status code of 200 and a
     * message saying that the appointment has been deleted
     * @param {IPersonAndAppointmentID} body - IPersonAndAppointmentID - this is the body of the
     * request, which is an object that has the following properties:
     * @param {Response} response - Response - this is the response object that will be returned to the
     * client
     * @returns The response object is being returned.
     */
    async deleteAppontment(
        @Body() body: IPersonAndAppointmentID,
        @Res() response: Response
    ) {
        try {
            const { appointment_id } = body;
            await this.appointmentsService.deleteAppointment(appointment_id);
            return response.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'appointment has been deleted'
            });
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Post('unsubscribe')
    /**
     * "It finds an appointment by id, then it unsubscribes a person from that appointment, then it
     * adjusts the subscribed value of that appointment."
     * </code>
     * @param {IPersonAndAppointmentID} body - IPersonAndAppointmentID
     * @param {Response} response - Response
     * @returns The response is being returned.
     */
    async unsubscribeAppointment(
        @Body() body: IPersonAndAppointmentID,
        @Res() response: Response,
    ) {
        try {
            const { person_id, appointment_id } = body;
            const appointment = await this.appointmentsService.findOne(
                appointment_id,
            );
            await this.appointmentsService.unsubscribe(person_id, appointment_id);
            await this.appointmentsService.adjustSubscribed({
                status: EStatus.DECREASE,
                target: {
                    appointment_id: appointment.id,
                    value: appointment.subscribed,
                },
            });
            return response.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: `person has been unsubscribed appointment`,
            });
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Post('subscribe')
    /**
     * "It takes a person_id and an appointment_id, finds the appointment, increases the subscribed
     * value of the appointment, and subscribes the person to the appointment."
     * </code>
     * @param {IPersonAndAppointmentID} body - IPersonAndAppointmentID
     * @param {Response} response - Response - this is the response object that is passed to the
     * controller method.
     * @returns {
     *         statusCode: HttpStatus.OK,
     *         message: `person has been subscribed appointment`,
     *     }
     */
    async subscribeAppointment(
        @Body() body: IPersonAndAppointmentID,
        @Res() response: Response,
    ) {
        try {
            const { person_id, appointment_id } = body;
            const appointment = await this.appointmentsService.findOne(
                appointment_id,
            );
            await this.appointmentsService.adjustSubscribed({
                status: EStatus.INCREASE,
                target: {
                    appointment_id: appointment.id,
                    value: appointment.subscribed,
                },
            });
            await this.appointmentsService.subscribe(person_id, appointment.id);
            return response.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: `person has been subscribed appointment`,
            });
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @Get('filter')
    async FilterByTags(
        @Res() response: Response,
        @Query() query: { tags: string[]; },
    ) {
        return response
            .status(HttpStatus.OK)
            .json(await this.appointmentsService.filterByTags(query.tags));
    }

    @Get()
    async findAllActive(@Res() response: Response) {
        return response.status(HttpStatus.OK).json(await this.appointmentsService.findAllActive());
    }

    @Get()
    async findAll(@Res() response: Response) {
        return response
            .status(HttpStatus.OK)
            .json(await this.appointmentsService.findAll());
    }

    @Post()
    async createOne(
        @Body() body: IAppointmentCreateOne,
        @Res() response: Response,
    ) {
        try {
            const { personId, appointment } = body;
            const person = await this.personsService.findOne(personId);
            await this.appointmentsService.createOne(person.id, appointment);
            return response.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: `${person.id} are created a new appointment`,
            });
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
