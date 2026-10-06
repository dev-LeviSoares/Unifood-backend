/*
  Warnings:

  - A unique constraint covering the columns `[pixKey]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "pixKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_pixKey_key" ON "users"("pixKey");
