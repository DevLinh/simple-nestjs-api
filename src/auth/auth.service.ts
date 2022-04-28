import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) { }
  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      //remove the hash out of the response
      delete user.hash;

      //return the saved user
      return { msg: 'Success', user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // check the email first
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // throw exception when the email not found
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    //Email correct -> compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    //wrong password -> throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    //success
    return { mg: 'Success', dto };
  }

  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret
      }
    );

    return {
      access_token: token
    }
  }
}
