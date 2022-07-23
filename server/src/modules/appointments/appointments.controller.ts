import {
  Body,
  Controller,
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
import { ISubscribeAppointment } from './interface/subscribe-appointment.interface';
import { Response } from 'express';
import { EStatus } from './interface/adjust-subscribe.interface';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private appointmentsService: AppointmentsService,
    private personsService: PersonsService,
  ) {}

  @Post('unsubscribe')
  async unsubscribeAppointment(
    @Body() body: ISubscribeAppointment,
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
  async subscribeAppointment(
    @Body() body: ISubscribeAppointment,
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
    @Query() query: { tags: string[] },
  ) {
    return response
      .status(HttpStatus.OK)
      .json(await this.appointmentsService.filterByTags(query.tags));
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
