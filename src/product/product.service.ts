import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ProductDto) {
    try {
      const product = await this.prisma.product.create({ data: dto });
      return product;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    console.log(id);
    return this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });
  }

  updateProductById(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...updateProductDto,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
