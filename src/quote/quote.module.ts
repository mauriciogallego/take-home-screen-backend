import { Module } from '@nestjs/common';
import { QuotesController } from './quote.controller';
import { QuotesService } from './quote.service';
import { SendGridService } from './sendGrid.service';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService, SendGridService],
})
export class QuoteModule {}
