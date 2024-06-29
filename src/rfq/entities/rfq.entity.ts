import { ApiProperty } from '@nestjs/swagger';
import { InventoryProduct, Prisma, Rfq as RfqPrisma } from '@prisma/client';

export class Rfq implements RfqPrisma {
  @ApiProperty()
  items: Prisma.JsonValue;
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
  @ApiProperty({
    example: [
      {
        product: {
          name: 'string',
          defaultPrice: 'number',
        },
        productId: 'string',
        inventoryId: 'string',
        quantity: 'number',
      },
    ],
  })
  inventory: InventoryProduct[];
}
