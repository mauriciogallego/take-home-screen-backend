import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { Service } from '@src/common/classes/service.class';
import { errorCodes } from '@src/constants/errors';
import { IEntityService, IPaginationArgs } from '@src/interfaces/types';

@Injectable()
export class ProductsService extends Service implements IEntityService {
  async findAll(params: IPaginationArgs<Prisma.ProductFindManyArgs>) {
    const { includeCount, skip, take, ...findAllParams } = params;

    return this.paginate(
      'product',
      {
        ...findAllParams,
      },
      { includeCount, skip, take },
    );
  }
  async findOne(id: string, findArgs?: { include?: Prisma.ProductInclude }) {
    const args: Prisma.ProductFindUniqueArgs = {
      where: {
        id,
      },
      ...findArgs,
    };

    const result = (await this.get('product', args)) as Product;
    if (!result) {
      throw new NotFoundException(errorCodes.PRODUCT_NOT_FOUND);
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
