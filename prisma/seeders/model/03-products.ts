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
      defaultPrice: 2,
      unit: 'sheets',
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
      defaultPrice: 1.5,
      unit: 'tubes',
      InventoryProduct: {
        create: {
          quantity: 250,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Steel Sheet',
      code: 'SSS-2',
      unit: 'kg',
      defaultPrice: 1.5,
      description: '',
      dimensions: ' length: 2000, width: 1000, thickness: 5',
      expiration_date: '2025-12-31',
      InventoryProduct: {
        create: {
          quantity: 500,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Aluminum Rod',
      code: 'SSS-3',
      unit: 'm',
      defaultPrice: 15,
      description: '',
      dimensions: 'length: 6, diameter: 50,',
      expiration_date: '2026-05-15',
      InventoryProduct: {
        create: {
          quantity: 200,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Copper Tube',
      code: 'Ct-1',
      unit: 'm',
      description: '',
      defaultPrice: 11.5,
      dimensions: 'length: 3, diameter: 20 ',
      expiration_date: '2024-11-20',
      InventoryProduct: {
        create: {
          quantity: 100,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Brass Plate',
      code: '',
      unit: 'kg',
      description: '',
      dimensions: 'length: 1500,width: 1000,thickness: 2',
      defaultPrice: 22,
      expiration_date: '2027-03-10',
      InventoryProduct: {
        create: {
          quantity: 300,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Stainless Steel Bar',
      code: 'SSB-1',
      unit: 'm',
      description: '',
      defaultPrice: 0.1,
      dimensions: 'length: 4, diameter: 25,',
      expiration_date: '2025-08-30',
      InventoryProduct: {
        create: {
          quantity: 150,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Titanium Sheet',
      code: 'TS-1',
      unit: 'kg',
      description: '',
      dimensions: 'length: 2500, width: 1200, thickness: 3,',
      defaultPrice: 10,
      expiration_date: '2028-01-25',
      InventoryProduct: {
        create: {
          quantity: 50,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Nickel Wire',
      code: '',
      unit: 'm',
      description: '',
      defaultPrice: 0.2,
      dimensions: 'length: 100, diameter: 1',
      InventoryProduct: {
        create: {
          quantity: 1000,
          inventoryId: inventory1,
        },
      },
      expiration_date: '2024-07-05',
    },
    {
      name: 'Zinc Ingot',
      code: '',
      unit: 'kg',
      description: '',
      dimensions: 'length: 300, width: 150, height: 100',
      defaultPrice: 1,
      expiration_date: '2026-02-17',
      InventoryProduct: {
        create: {
          quantity: 200,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Lead Pipe',
      code: '',
      unit: 'm',
      description: '',
      defaultPrice: 20,
      dimensions: 'length: 2, diameter: 100',
      expiration_date: '2024-09-11',
      InventoryProduct: {
        create: {
          quantity: 50,
          inventoryId: inventory1,
        },
      },
    },
    {
      name: 'Magnesium Block',
      code: '',
      unit: 'kg',
      description: '',
      dimensions: 'length: 500, width: 500, height: 300,',
      defaultPrice: 1,
      expiration_date: '2025-06-19',
      InventoryProduct: {
        create: {
          quantity: 70,
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
