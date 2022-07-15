/*
  Warnings:

  - You are about to alter the column `price` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_person_id_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "person_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
