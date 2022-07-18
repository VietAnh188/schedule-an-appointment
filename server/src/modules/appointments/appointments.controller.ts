import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PersonsService } from '../persons/persons.service';
import { IAppointmentCreateOne } from './interface/appointment-create-one.interface';
import { Response } from 'express';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private appointmentsService: AppointmentsService,
    private personsService: PersonsService,
  ) {}

  @Get()
  async findAll() {
    return await this.appointmentsService.findAll();
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
        status: HttpStatus.OK,
        response: `${person.id} are created a new appointment`,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
