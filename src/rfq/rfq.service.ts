import { Injectable, NotFoundException } from '@nestjs/common';
import { Rfq, Prisma } from '@prisma/client';
import { Service } from '@src/common/classes/service.class';
import { errorCodes } from '@src/constants/errors';
import {
  IEntityService,
  IPaginationArgs,
  CreateRFQData,
  ProductRFQ,
} from '@src/interfaces/types';
import { ChatgptService } from './chatgpt.service';
import { PrismaService } from '@src/database/prisma.service';
import { isRfq, getProductList } from '@src/constants/rfq.constant';

@Injectable()
export class RfqService extends Service implements IEntityService {
  constructor(
    readonly prisma: PrismaService,
    readonly chatgptService: ChatgptService,
  ) {
    super(prisma);
  }

  async findAll(params: IPaginationArgs<Prisma.RfqFindManyArgs>) {
    const { includeCount, skip, take, ...findAllParams } = params;

    return this.paginate(
      'rfq',
      {
        ...findAllParams,
      },
      { includeCount, skip, take },
    );
  }
  async findOne(id: string, findArgs?: { include?: Prisma.RfqInclude }) {
    const args: Prisma.RfqFindUniqueArgs = {
      where: {
        id,
      },
      ...findArgs,
    };

    const result = (await this.get('rfq', args)) as Rfq;
    if (!result) {
      throw new NotFoundException(errorCodes.FQR_NOT_FOUND);
    }

    const { products } = result.items as { products: ProductRFQ[] };

    // every time some ask for an RFQ, we'll calculate the stock at the moment
    const stock = await this.prisma.inventoryProduct.findMany({
      where: {
        OR: products.map((i) => ({
          product: {
            name: i.name,
          },
        })),
        quantity: {
          gte: 1,
        },
      },
      include: {
        product: {
          select: {
            name: true,
            defaultPrice: true,
          },
        },
      },
    });
    return {
      ...result,
      inventory: stock,
    };
  }

  async create({ subject, text, email, html }: CreateRFQData) {
    // asking AI if the email is a RFQ
    const RFQQuestion = await this.chatgptService.generateResponse(
      isRfq + text,
    );

    if (RFQQuestion.message.content === 'YES') {
      // getting products from the email
      const productQuestion = await this.chatgptService.generateResponse(
        getProductList + text,
      );

      const products = JSON.parse(productQuestion.message.content) as object;
      await this.prisma.rfq.create({
        data: {
          customerEmail: email.address,
          body: html || text,
          subject,
          items: products,
        },
      });
    }

    return;
  }
  update() {
    throw new Error('Method not implemented.');
  }
}
