import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @Min(1000)
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Min(1000)
  @Type(() => Number)
  originalPrice: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  discountRate?: number;

  @IsString()
  name: string;
}
