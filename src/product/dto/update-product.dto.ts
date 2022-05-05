import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Type(() => Number)
  originalPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discountRate?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
