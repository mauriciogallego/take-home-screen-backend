import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Model } from '../seed';

const hashedPassword = bcrypt.hashSync('pass*2023', 10);

const model: Model & {
  data: Prisma.SaleCreateInput[];
} = {
  data: [
    {
      name: 'prueba',
      password: hashedPassword,
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
