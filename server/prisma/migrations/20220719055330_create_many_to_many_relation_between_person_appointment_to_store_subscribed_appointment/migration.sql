-- CreateTable
CREATE TABLE "PersonsSubscribeAppointments" (
    "id" UUID NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "person_id" UUID NOT NULL,
    "appointment_id" UUID NOT NULL,

    CONSTRAINT "PersonsSubscribeAppointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonsSubscribeAppointments" ADD CONSTRAINT "PersonsSubscribeAppointments_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonsSubscribeAppointments" ADD CONSTRAINT "PersonsSubscribeAppointments_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
