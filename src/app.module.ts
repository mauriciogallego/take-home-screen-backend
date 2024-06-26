import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { QuoteModule } from './quote/quote.module';
import { FrqModule } from './frq/frq.module';

@Module({
  imports: [SalesModule, QuoteModule, FrqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
