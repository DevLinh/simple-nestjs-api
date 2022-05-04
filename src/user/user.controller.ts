import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get('myemail')
  getMyEmail(@GetUser('email') email: string): Object {
    return { email: email };
  }

  @Patch()
  editUser() {
    return 'a';
  }
}
