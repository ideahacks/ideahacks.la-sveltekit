/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Email` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");
