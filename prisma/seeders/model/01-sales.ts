import { Prisma, PrismaClient } from '@prisma/client';
import { Model } from '../seed';

const model: Model & {
  data: Prisma.SaleCreateInput[];
} = {
  data: [
    {
      name: 'prueba',
      password: '$2a$10$2/Xm9ROhke4hlMxcVJZFMOL6/30vHXPNr/XHqgTznvcK44W2FABg2',
      email: 'mauricio@gmail.com',
    },
  ],
  async run(prisma: PrismaClient) {
    for (const user of this.data) {
      await prisma.sale.create({
        data: user,
      });
    }

    return true;
  },
};

export default model;
