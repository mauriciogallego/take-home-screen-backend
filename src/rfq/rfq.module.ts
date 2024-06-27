import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { ImapService } from './imap.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  controllers: [RfqController],
  providers: [RfqService, ImapService],
  exports: [RfqService, ImapService],
  imports: [ConfigModule],
})
export class RfqModule {}
