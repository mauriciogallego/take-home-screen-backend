import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { ChatgptService } from './chatgpt.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RfqController],
  providers: [RfqService, ChatgptService],
})
export class RfqModule {}
