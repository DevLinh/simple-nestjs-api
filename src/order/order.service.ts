import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, OrderItem } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const order = await this.prisma.order.create({ data: dto });
    dto.orderItems.forEach((orderItem: OrderItem) => {
      orderItem.order = order.id;
      this.prisma.orderItem.create({ data: orderItem });
    });
    return order;
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        orderId: id,
      },
    });

    return { ...order, orderItems };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
