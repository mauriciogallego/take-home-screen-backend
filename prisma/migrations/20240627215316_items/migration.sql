/*
  Warnings:

  - You are about to drop the column `expireDate` on the `QuoteItem` table. All the data in the column will be lost.
  - Added the required column `address` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensions` to the `QuoteItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `QuoteItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `QuoteItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items` to the `Rfq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quote` ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `QuoteItem` DROP COLUMN `expireDate`,
    ADD COLUMN `dimensions` VARCHAR(191) NOT NULL,
    ADD COLUMN `dueDate` DATETIME(3) NOT NULL,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Rfq` ADD COLUMN `items` JSON NOT NULL;
