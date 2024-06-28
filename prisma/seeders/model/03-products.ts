import { Prisma, PrismaClient } from '@prisma/client';
import { Model } from '../seed';
import { inventory } from '../constants';

const { inventory1 } = inventory;

const model: Model & {
  data: Prisma.ProductCreateInput[];
} = {
  data: [
    {
      name: 'Stainless Steel Sheets',
      code: 'SSS-01',
      description: '',
      deafultPrice: 2,
      measuringUnit: 'sheets',
      InventoryProduct: {
        create: {
          quantity: 400,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Carbon Steel Tubes',
      code: 'CST-01',
      description: '',
      deafultPrice: 1.5,
      measuringUnit: 'tubes',
      InventoryProduct: {
        create: {
          quantity: 250,
          inventoryId: inventory1,
        },
      },
    },
  ],
  async run(prisma: PrismaClient) {
    for (const product of this.data) {
      await prisma.product.create({
        data: product,
      });
    }

    return true;
  },
};

export default model;
