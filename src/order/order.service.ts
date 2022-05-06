import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto, orderBy: number) {
    const order = await this.prisma.order.create({
      data: {
        orderBy: orderBy,
        status: dto.status,
        orderItems: {
          createMany: { data: [...dto.orderItems] },
        },
      },
      include: {
        orderItems: true,
      },
    });
    return order;
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  async filter(conditions: any) {
    const orders = await this.prisma.order.findMany({
      where: {
        ...conditions,
      },
      include: {
        orderItems: true,
      },
    });
    return orders;
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id: id },
      data: { ...updateOrderDto },
    });
  }

  async remove(id: number) {
    await this.prisma.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });
    await this.prisma.order.delete({
      where: {
        id: id,
      },
    });
  }
}
