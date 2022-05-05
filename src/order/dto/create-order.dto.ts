import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

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
  product: number;

  @Type(() => Number)
  @IsNumber()
  order: number;
}

export class CreateOrderDto {
  @IsString()
  status: string;

  @Type(() => Array)
  // @IsArray()
  orderItems: OrderItem[];

  @Type(() => Number)
  @IsNumber()
  customer: number;
}
