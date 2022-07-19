/*
  Warnings:

  - You are about to drop the column `subcribed` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "subcribed",
ADD COLUMN     "subscribed" INTEGER NOT NULL DEFAULT 0;
