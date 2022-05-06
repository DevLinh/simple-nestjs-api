import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { RolesGuard } from './auth/guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
