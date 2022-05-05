import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum OrderStatus {
  'Ready' = 1,
  'Confirmed' = 2,
  'Rejected' = 3,
  'Completed' = 4,
}

export class OrderItem {
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  productId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  orderId: number;
}

export class CreateOrderDto {
  @IsString()
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  @ArrayMinSize(1)
  orderItems: OrderItem[];

  // @IsArray()
  // @Type(() => Number)
  // items: number[];

  @Type(() => Number)
  @IsNumber()
  orderBy: number;
}
