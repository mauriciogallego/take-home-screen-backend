import { ApiProperty } from '@nestjs/swagger';
import { Sale as SalePrisma } from '@prisma/client';

export class Sale implements SalePrisma {
  @ApiProperty()
  active: boolean;
  @ApiProperty({ example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f' })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
