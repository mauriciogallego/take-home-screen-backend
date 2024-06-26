import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ListQueryArgsDto } from '@src/common/dto/list-query-args.dto';
import { ListQueryArgsPipe } from '@src/common/pipes/ListQueryArgsPipe';
import { GetQueryArgsPipe } from '@src/common/pipes/get-query-args-pipe';
import { GetQueryRelationDto } from '@src/common/dto/get-query-relation.dto';
import { ProductList } from './entities/product-list.entity';
import { Product } from '@prisma/client';

@ApiTags('products')
@ApiBearerAuth()
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get all Products',
    description: 'Return a list of Products',
  })
  @Get()
  findAll(
    @Query(ListQueryArgsPipe) params: ListQueryArgsDto,
  ): Promise<ProductList> {
    return this.productsService.findAll(params);
  }

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get one Product',
    description: 'Return an Product',
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query(GetQueryArgsPipe) params: GetQueryRelationDto,
  ): Promise<Product> {
    return this.productsService.findOne(id, params);
  }
}
