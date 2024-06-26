import { ApiProperty } from '@nestjs/swagger';
import { Rfq as RfqPrisma } from '@prisma/client';

export class Rfq implements RfqPrisma {
  @ApiProperty({ example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f' })
  id: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  customerEmail: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
