// import { Type } from 'class-transformer';
import {
  //   ArrayMinSize,
  //   IsArray,
  IsOptional,
  IsString,
  //   ValidateNested,
} from 'class-validator';
// import { OrderItem } from './create-order.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  status: string;

  //   @IsOptional()
  //   @IsArray()
  //   @ValidateNested({ each: true })
  //   @Type(() => OrderItem)
  //   @ArrayMinSize(1)
  //   orderItems: OrderItem[];
}
