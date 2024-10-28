/*
  Warnings:

  - You are about to alter the column `status` on the `role` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(7))`.

*/
-- DropForeignKey
ALTER TABLE `permission` DROP FOREIGN KEY `permission_menu_id_fkey`;

-- DropForeignKey
ALTER TABLE `permission` DROP FOREIGN KEY `permission_role_id_fkey`;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `status` ENUM('enable', 'disable') NOT NULL DEFAULT 'enable';

-- AlterTable
ALTER TABLE `permission` ADD COLUMN `status` ENUM('enable', 'disable') NOT NULL DEFAULT 'enable';

-- AlterTable
ALTER TABLE `role` MODIFY `status` ENUM('enable', 'disable') NOT NULL DEFAULT 'enable';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `status` ENUM('enable', 'disable') NOT NULL DEFAULT 'enable';

-- CreateTable
CREATE TABLE `Pricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `discount` DOUBLE NULL,
    `effective_date` DATETIME(3) NULL,
    `expiration_date` DATETIME(3) NULL,
    `status` ENUM('enable', 'disable') NOT NULL DEFAULT 'enable',
    `version` INTEGER NOT NULL DEFAULT 1,
    `category` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `status` ENUM('enable', 'disable') NOT NULL DEFAULT 'enable',
    `company` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Redemption_Code` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `discount_amount` DOUBLE NULL,
    `discount_type` VARCHAR(191) NOT NULL,
    `usage_limit` INTEGER NULL,
    `used_count` INTEGER NOT NULL DEFAULT 0,
    `valid_from` DATETIME(3) NULL,
    `valid_until` DATETIME(3) NULL,
    `status` ENUM('enable', 'disable') NOT NULL DEFAULT 'enable',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Redemption_Code_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
