import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { QuoteModule } from './quote/quote.module';
import { RfqModule } from './rfq/rfq.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [SalesModule, QuoteModule, RfqModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
