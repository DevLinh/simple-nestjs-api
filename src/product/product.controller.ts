import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, UpdateProductDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() dto: ProductDto) {
    console.log({ dto });
    return this.productService.create(dto);
  }

  @Get('getall')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) productId: number) {
    console.log(productId);
    return this.productService.findOne(productId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProductById(id, updateProductDto);
  }

  // @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
