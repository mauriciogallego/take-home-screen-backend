import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateQuoteItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsArray()
  @ValidateNested()
  @Type(() => CreateQuoteItemDto)
  items: CreateQuoteItemDto[];
}
