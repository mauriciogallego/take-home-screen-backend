import {
  Controller,
  Body,
  Get,
  Request,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuotesService } from './quote.service';
import { ListQueryArgsDto } from '@src/common/dto/list-query-args.dto';
import { ListQueryArgsPipe } from '@src/common/pipes/ListQueryArgsPipe';
import { GetQueryArgsPipe } from '@src/common/pipes/get-query-args-pipe';
import { GetQueryRelationDto } from '@src/common/dto/get-query-relation.dto';
import { Quote } from '@prisma/client';
import { QuoteList } from './entities/quote-list.entity';
import { IRequestUser } from '@src/interfaces/types';
import { CreateQuoteDto } from './dto/create-quote.dto';

@ApiTags('quote')
@ApiBearerAuth()
@Controller({
  path: 'quote',
  version: '1',
})
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get all Quotes',
    description: 'Return a list of Quotes',
  })
  @Get()
  findAll(
    @Query(ListQueryArgsPipe) params: ListQueryArgsDto,
  ): Promise<QuoteList> {
    return this.quotesService.findAll(params);
  }

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Get one Quote',
    description: 'Return an Quote',
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query(GetQueryArgsPipe) params: GetQueryRelationDto,
  ): Promise<Quote> {
    return this.quotesService.findOne(id, params);
  }

  @ApiOperation({
    servers: [{ url: '/v1' }],
    summary: 'Create a new Quote',
  })
  @Post('/rfq/:rfqId')
  async create(
    @Request() req,
    @Param('rfqId') rfqId: string,
    @Body() body: CreateQuoteDto,
  ) {
    const { id: saleId } = req.user as IRequestUser;

    return this.quotesService.create({
      saleId,
      rfqId,
      total: body.total,
      address: body.address,
      items: body.items,
    });
  }
}
