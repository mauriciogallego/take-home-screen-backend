import { ApiProperty } from '@nestjs/swagger';
import { Product as ProductPrisma } from '@prisma/client';

export class Product implements ProductPrisma {
  @ApiProperty({ example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f' })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  unit: string;
  @ApiProperty()
  dimensions: string;
  @ApiProperty()
  defaultPrice: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
