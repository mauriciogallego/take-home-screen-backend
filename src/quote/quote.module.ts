import { Module } from '@nestjs/common';
import { QuotesController } from './quote.controller';
import { QuotesService } from './quote.service';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuoteModule {}
