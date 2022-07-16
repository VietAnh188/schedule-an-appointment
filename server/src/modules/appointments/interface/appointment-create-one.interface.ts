import { Appointment } from '@prisma/client';

export interface IAppointmentCreateOne {
  personId: string;
  appointment: Appointment;
}
