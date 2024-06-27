import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { ChatgptService } from './chatgpt.service';
import { ImapService } from './imap.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  controllers: [RfqController],
  providers: [RfqService, ImapService, ChatgptService],
  exports: [RfqService, ImapService],
})
export class RfqModule {}
