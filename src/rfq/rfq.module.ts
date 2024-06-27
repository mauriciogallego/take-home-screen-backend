import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { ChatgptService } from './chatgpt.service';
import { HttpModule } from '@nestjs/axios';
import { ImapService } from './imap.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [RfqController],
  providers: [RfqService, ImapService, ChatgptService],
  exports: [RfqService, ImapService],
})
export class RfqModule {}
