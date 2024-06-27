import { Injectable, NotFoundException } from '@nestjs/common';
import { Rfq, Prisma } from '@prisma/client';
import { Service } from '@src/common/classes/service.class';
import { errorCodes } from '@src/constants/errors';
import { IEntityService, IPaginationArgs } from '@src/interfaces/types';
import { ChatgptService } from './chatgpt.service';
import { PrismaService } from '@src/database/prisma.service';

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
  create() {
    this.chatgptService;
    throw new Error('Method not implemented.');
  }
  update() {
    throw new Error('Method not implemented.');
  }
}
