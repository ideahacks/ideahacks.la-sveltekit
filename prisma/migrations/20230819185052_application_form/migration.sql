/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Email` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ApplicationForm" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pronouns" TEXT,
    "school" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "github" TEXT,
    "linkedin" TEXT,
    "hasTeam" TEXT NOT NULL,
    "teammate1" TEXT NOT NULL,
    "teammate2" TEXT NOT NULL,
    "teammate3" TEXT NOT NULL,
    "teammate4" TEXT NOT NULL,
    "q1" TEXT NOT NULL,
    "q2" TEXT NOT NULL,
    "q3" TEXT,
    "q4" TEXT NOT NULL,
    "q5" TEXT,
    "q6" TEXT,
    "requiresHousingAssistance" TEXT NOT NULL,
    "shirtSize" TEXT NOT NULL,
    "dietaryRestrictions" TEXT NOT NULL,

    CONSTRAINT "ApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationForm_email_key" ON "ApplicationForm"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");
