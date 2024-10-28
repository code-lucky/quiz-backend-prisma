/*
  Warnings:

  - You are about to alter the column `type` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `permission` MODIFY `type` INTEGER NOT NULL DEFAULT 0;
