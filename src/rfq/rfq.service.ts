import { Injectable, NotFoundException } from '@nestjs/common';
import { Rfq, Prisma } from '@prisma/client';
import { Service } from '@src/common/classes/service.class';
import { errorCodes } from '@src/constants/errors';
import {
  IEntityService,
  IPaginationArgs,
  createRFQData,
} from '@src/interfaces/types';
import { ChatgptService } from './chatgpt.service';
import { PrismaService } from '@src/database/prisma.service';
import { isRfq, getProductList } from '@src/constants/frq.constant';

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

    const result = (await this.get('frq', args)) as Rfq;
    if (!result) {
      throw new NotFoundException(errorCodes.FQR_NOT_FOUND);
    }
    return result;
  }

  async create({ subject, text, email }: createRFQData) {
    // asking AI if the email is a RFQ
    const RFQQuestion = await this.chatgptService.generateResponse(
      isRfq + text,
    );
    console.log(RFQQuestion);

    if (RFQQuestion.message.content === 'YES') {
      const productQuestion = await this.chatgptService.generateResponse(
        getProductList + text,
      );

      const products = JSON.parse(productQuestion.message.content) as object;
      await this.prisma.rfq.create({
        data: {
          customerEmail: email.address,
          body: text,
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
