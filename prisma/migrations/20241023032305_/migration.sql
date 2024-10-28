/*
  Warnings:

  - You are about to alter the column `status` on the `menu` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `menu` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
