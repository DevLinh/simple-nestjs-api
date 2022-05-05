import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: { orderBy: dto.orderBy, status: dto.status },
    });
    console.log(dto);
    dto.orderItems.forEach(async (orderItem) => {
      await this.prisma.orderItem.create({
        data: {
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          orderId: order.id,
        },
      });
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
