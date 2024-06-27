import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { ImapService } from './imap.service';

@Module({
  controllers: [RfqController],
  providers: [RfqService, ImapService],
  exports: [RfqService, ImapService],
})
export class RfqModule {}
