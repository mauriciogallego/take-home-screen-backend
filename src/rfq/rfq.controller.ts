import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RfqService } from './rfq.service';
import { ListQueryArgsDto } from '@src/common/dto/list-query-args.dto';
import { ListQueryArgsPipe } from '@src/common/pipes/ListQueryArgsPipe';
import { GetQueryArgsPipe } from '@src/common/pipes/get-query-args-pipe';
import { GetQueryRelationDto } from '@src/common/dto/get-query-relation.dto';
import { RfqList } from './entities/rfq-list.entity';
import { Rfq } from './entities/rfq.entity';

@ApiTags('rfq')
@ApiBearerAuth()
@Controller({
  path: 'rfq',
  version: '1',
})
export class RfqController {
  constructor(private rfqService: RfqService) {}

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get all RFQ',
    description: 'Return a list of RFQ',
  })
  @Get()
  findAll(
    @Query(ListQueryArgsPipe) params: ListQueryArgsDto,
  ): Promise<RfqList> {
    return this.rfqService.findAll(params);
  }

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get one Frq',
    description: 'Return an Frq',
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query(GetQueryArgsPipe) params: GetQueryRelationDto,
  ): Promise<Rfq> {
    return this.rfqService.findOne(id, params);
  }
}
