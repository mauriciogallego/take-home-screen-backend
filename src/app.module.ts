import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { QuoteModule } from './quote/quote.module';
import { RfqModule } from './rfq/rfq.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { HealthController } from './health/health.controller';
import { PrismaHealthIndicator } from '@nestjs/terminus';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expiration') },
      }),
    }),
    SalesModule,
    PrismaModule,
    QuoteModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    RfqModule,
    ProductsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, ProductsService, PrismaHealthIndicator],
})
export class AppModule {}
