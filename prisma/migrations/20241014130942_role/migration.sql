/*
  Warnings:

  - You are about to alter the column `status` on the `role` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Int`.

*/
-- AlterTable
ALTER TABLE `role` MODIFY `status` INTEGER NOT NULL DEFAULT 1;
