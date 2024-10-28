-- CreateTable
CREATE TABLE `Permission` (
    `id` VARCHAR(191) NOT NULL,
    `parentId` VARCHAR(191) NULL,
    `label` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `type` ENUM('CATALOGUE', 'MENU', 'BUTTON') NOT NULL,
    `route` VARCHAR(191) NOT NULL,
    `order` INTEGER NULL,
    `status` ENUM('ENABLE', 'DISABLE') NULL,
    `hide` BOOLEAN NULL DEFAULT false,
    `hideTab` BOOLEAN NULL DEFAULT false,
    `newFeature` BOOLEAN NULL DEFAULT false,
    `frameSrc` VARCHAR(191) NULL,
    `component` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
