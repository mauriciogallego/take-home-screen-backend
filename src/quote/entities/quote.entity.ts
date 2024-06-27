import { ApiProperty } from '@nestjs/swagger';
import { Quote as QuotePrisma } from '@prisma/client';

export class Quote implements QuotePrisma {
  @ApiProperty()
  address: string;
  @ApiProperty({ example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f' })
  id: string;
  @ApiProperty()
  total: number;
  @ApiProperty()
  frqId: string;
  @ApiProperty()
  saleId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
