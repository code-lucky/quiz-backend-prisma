-- CreateTable
CREATE TABLE `palette_collect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `palette_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `palette_collect` ADD CONSTRAINT `palette_collect_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palette_collect` ADD CONSTRAINT `palette_collect_palette_id_fkey` FOREIGN KEY (`palette_id`) REFERENCES `palettes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
