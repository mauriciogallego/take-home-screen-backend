import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsOptional } from 'class-validator';

export class GetQueryRelationDto {
  @IsJSON()
  @IsOptional()
  @ApiProperty({ type: String })
  include?: Record<string, boolean>;
}
