/*
  Warnings:

  - You are about to alter the column `gender` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_role_id_fkey`;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `status` ENUM('ENABLED', 'DISABLED') NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE `user` MODIFY `gender` ENUM('male', 'female') NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_username_key` TO `User_username_key`;
