import { Injectable, NotFoundException } from '@nestjs/common';
import { Sale } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Service } from '@src/common/classes/service.class';
import { errorCodes } from '@src/constants/errors';
import { PrismaService } from '@src/database/prisma.service';
import { IEntityService, IPaginationArgs } from '@src/interfaces/types';

@Injectable()
export class SalesService extends Service implements IEntityService {
  constructor(readonly prisma: PrismaService) {
    super(prisma);
  }

  findByEmail(email: string) {
    return this.prisma.sale.findFirst({
      where: { email },
    });
  }

  async findAll(params: IPaginationArgs<Prisma.SaleFindManyArgs>) {
    const { includeCount, skip, take, ...findAllParams } = params;

    return this.paginate(
      'sale',
      {
        ...findAllParams,
      },
      { includeCount, skip, take },
    );
  }
  async findOne(id: string, findArgs?: { include?: Prisma.SaleInclude }) {
    const args: Prisma.SaleFindUniqueArgs = {
      where: {
        id,
      },
      ...findArgs,
    };

    const result = (await this.get('sale', args)) as Sale;
    if (!result) {
      throw new NotFoundException(errorCodes.SALE_NOT_FOUND);
    }
    return result;
  }
  async create(data: Prisma.SaleCreateInput) {
    return await this.prisma.sale.create({
      data,
    });
  }
  async update() {
    throw new Error('Method not implemented.');
  }
}
