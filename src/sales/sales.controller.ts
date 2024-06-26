import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { ListQueryArgsDto } from '@src/common/dto/list-query-args.dto';
import { ListQueryArgsPipe } from '@src/common/pipes/ListQueryArgsPipe';
import { GetQueryArgsPipe } from '@src/common/pipes/get-query-args-pipe';
import { GetQueryRelationDto } from '@src/common/dto/get-query-relation.dto';
import { SaleList } from './entities/sale-list.entity';
import { Sale } from '@prisma/client';

@ApiTags('sales')
@ApiBearerAuth()
@Controller({
  path: 'sales',
  version: '1',
})
export class SalesController {
  constructor(private salesService: SalesService) {}

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get all Sales',
    description: 'Return a list of Sales',
  })
  @Get()
  findAll(
    @Query(ListQueryArgsPipe) params: ListQueryArgsDto,
  ): Promise<SaleList> {
    return this.salesService.findAll(params);
  }

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get one Sale',
    description: 'Return an Sale',
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query(GetQueryArgsPipe) params: GetQueryRelationDto,
  ): Promise<Sale> {
    return this.salesService.findOne(id, params);
  }
}
