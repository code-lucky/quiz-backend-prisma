-- DropForeignKey
ALTER TABLE `permission` DROP FOREIGN KEY `Permission_menu_id_fkey`;

-- DropForeignKey
ALTER TABLE `permission` DROP FOREIGN KEY `Permission_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_role_id_fkey`;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `openid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `permission_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permission` ADD CONSTRAINT `permission_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `client` RENAME INDEX `Client_email_key` TO `client_email_key`;

-- RenameIndex
ALTER TABLE `redemption_code` RENAME INDEX `Redemption_Code_code_key` TO `redemption_code_code_key`;

-- RenameIndex
ALTER TABLE `role` RENAME INDEX `Role_name_key` TO `role_name_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_user_name_key` TO `user_user_name_key`;
