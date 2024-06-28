import { Prisma, PrismaClient } from '@prisma/client';
import { Model } from '../seed';
import { inventory } from '../constants';

const { inventory1 } = inventory;

const model: Model & {
  data: Prisma.InventoryCreateInput[];
} = {
  data: [
    {
      id: inventory1,
      name: 'main warehouse',
      location: 'bogota, cundinamarca, colombia',
    },
  ],
  async run(prisma: PrismaClient) {
    for (const inventory of this.data) {
      await prisma.inventory.create({
        data: inventory,
      });
    }

    return true;
  },
};

export default model;
