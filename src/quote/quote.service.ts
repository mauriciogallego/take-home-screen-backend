import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma, Quote } from '@prisma/client';
import { Service } from '@src/common/classes/service.class';
import { errorCodes } from '@src/constants/errors';
import { IEntityService, IPaginationArgs } from '@src/interfaces/types';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { PrismaService } from '@src/database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { SendGridService } from './sendGrid.service';

@Injectable()
export class QuotesService extends Service implements IEntityService {
  constructor(
    readonly prisma: PrismaService,
    private configService: ConfigService,
    private sendGridService: SendGridService,
  ) {
    super(prisma);
  }

  private async validateRfqId(id: string) {
    const exist = await this.prisma.rfq.count({
      where: {
        id,
      },
    });

    if (!exist) {
      throw new UnprocessableEntityException(errorCodes.RFQ_NOT_FOUND);
    }
  }

  private async validateSaleId(id: string) {
    const exist = await this.prisma.sale.count({
      where: {
        id,
      },
    });

    if (!exist) {
      throw new UnprocessableEntityException(errorCodes.SALE_NOT_FOUND);
    }
  }

  private async buildQuoteItems(
    items: CreateQuoteDto['items'],
  ): Promise<Prisma.QuoteItemCreateManyQuoteInput[]> {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: items.map((i) => i.productId),
        },
      },
    });

    return items.map((item) => {
      const product = products.find((i) => i.id === item.productId);

      if (!product) {
        throw new UnprocessableEntityException(errorCodes.PRODUCT_NOT_FOUND);
      }

      return {
        quantity: item.quantity,
        productId: product.id,
        amount: item.quantity * product.defaultPrice,
        priceUnit: product.defaultPrice,
        unit: product.unit,
        dueDate: item.dueDate,
      };
    });
  }

  private async inventoryControl(
    items: CreateQuoteDto['items'],
    inventoryId: string,
  ) {
    const inventoryProducts = await this.prisma.inventoryProduct.findMany({
      where: {
        inventoryId,
        productId: {
          in: items.map((item) => item.productId),
        },
      },
    });

    for (const item of items) {
      const inventoryProduct = inventoryProducts.find(
        (i) => i.productId === item.productId,
      );

      if (!inventoryProduct) {
        throw new UnprocessableEntityException(errorCodes.PRODUCT_NOT_FOUND);
      }

      if (inventoryProduct.quantity <= item.quantity) {
        throw new UnprocessableEntityException(errorCodes.PRODUCT_OUT_OF_STOCK);
      }
    }
  }

  async findAll(params: IPaginationArgs<Prisma.QuoteFindManyArgs>) {
    const { includeCount, skip, take, ...findAllParams } = params;

    return this.paginate(
      'quote',
      {
        ...findAllParams,
      },
      { includeCount, skip, take },
    );
  }

  async findOne(id: string, findArgs?: { include?: Prisma.QuoteInclude }) {
    const args: Prisma.QuoteFindUniqueArgs = {
      where: {
        id,
      },
      ...findArgs,
    };

    const result = (await this.get('quote', args)) as Quote;
    if (!result) {
      throw new NotFoundException(errorCodes.QUOTE_NOT_FOUND);
    }
    return result;
  }

  async create(data: CreateQuoteDto & { saleId: string; rfqId: string }) {
    const defaultInventoryId = this.configService.get('defaultInventoryId');
    const { rfqId, saleId, items, ...rest } = data;

    await this.validateRfqId(rfqId);
    await this.validateSaleId(saleId);
    await this.inventoryControl(items, defaultInventoryId);

    const quoteItems = await this.buildQuoteItems(items);

    const quoteCreated = await this.prisma.quote.create({
      data: {
        ...rest,
        rfq: { connect: { id: rfqId } },
        sale: {
          connect: {
            id: saleId,
          },
        },
        QuoteItem: {
          createMany: {
            data: quoteItems,
          },
        },
      },
    });

    this.sendGridService.sendEmailWithTemplate({
      recipient: 'josega200522@gmail.com',
      body: {
        recipient_name: 'Jose',
        orderDetails: [
          {
            name: 'Product 1',
            quantity: 1,
            price: '$10.00',
          },
          {
            name: 'Product 2',
            quantity: 2,
            price: '$20.00',
          },
        ],
        total: '$30.00',
      },
      subject: 'test',
    });

    return quoteCreated;
  }
  update() {
    throw new Error('Method not implemented.');
  }
}
