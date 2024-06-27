-- CreateTable
CREATE TABLE `RfqItem` (
    `id` VARCHAR(36) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `rfqId` VARCHAR(36) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RfqItem` ADD CONSTRAINT `RfqItem_rfqId_fkey` FOREIGN KEY (`rfqId`) REFERENCES `Rfq`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RfqItem` ADD CONSTRAINT `RfqItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
