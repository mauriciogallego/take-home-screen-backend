import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Quote } from '@prisma/client';
import { Service } from '@src/common/classes/service.class';
import { errorCodes } from '@src/constants/errors';
import { IEntityService, IPaginationArgs } from '@src/interfaces/types';

@Injectable()
export class QuotesService extends Service implements IEntityService {
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
  create() {
    throw new Error('Method not implemented.');
  }
  update() {
    throw new Error('Method not implemented.');
  }
}
