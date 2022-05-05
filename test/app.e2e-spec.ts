import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let access_token: string;

  // const responseUserShape = expect.objectContaining({
  //   id: expect.any(Number),
  //   createAt: expect.any(String),
  //   updateAt: expect.any(String),
  //   firstName: expect.any(String) | expect.any(null),
  //   lastName: expect.any(String) | expect.any(null),
  //   email: expect.any(String),
  // });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    //create sample products
    await prisma.product.createMany({
      data: [
        {
          name: 'TV',
          price: 1200,
          originalPrice: 1100,
        },
        { name: 'Xbox', price: 1500, originalPrice: 1200 },
      ],
    });
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'linh1@gmail.com',
      password: '123abc',
    };
    describe('Signup', () => {
      it('should signup success', async () => {
        const { status } = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            email: dto.email,
            password: dto.password,
          });
        expect(status).toBe(201);
        // expect(body.user).toStrictEqual(responseUserShape);
      });

      it('should require information', async () => {
        const { status, body } = await request(app.getHttpServer()).post(
          '/auth/signup',
        );
        expect(status).toBe(400);
        expect(body).toStrictEqual({
          statusCode: 400,
          message: [
            'email should not be empty',
            'email must be an email',
            'password should not be empty',
            'password must be a string',
          ],
          error: 'Bad Request',
        });
      });

      it('should require email in the right format', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            email: 'not an email',
            password: dto.password,
          });
        expect(status).toBe(400);
        expect(body).toStrictEqual({
          statusCode: 400,
          message: ['email must be an email'],
          error: 'Bad Request',
        });
      });

      it('should require password', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            email: dto.email,
          });
        expect(status).toBe(400);
        expect(body).toStrictEqual({
          statusCode: 400,
          message: [
            'password should not be empty',
            'password must be a string',
          ],
          error: 'Bad Request',
        });
      });
    });

    describe('Signin', () => {
      it('should signin success', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            email: dto.email,
            password: dto.password,
          });
        access_token = body.access_token;
        expect(status).toBe(200);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get email', async () => {
        const { status, body } = await request(app.getHttpServer())
          .get('/users/myemail')
          .set({ Authorization: `Bearer ${access_token}` });
        console.log(body);
        expect(status).toBe(200);
      });

      it('should get my user info', async () => {
        const { status, body } = await request(app.getHttpServer())
          .get('/users/me')
          .set({ Authorization: `Bearer ${access_token}` });
        console.log(body);
        expect(status).toBe(200);
      });
    });

    describe('Edit user', () => {
      it.todo('Edit user');
    });
  });

  describe('Order', () => {
    it('create order', async () => {
      const ex = {
        status: 'Ready',
        orderBy: 1,
        orderItems: [
          { quantity: 1, product: 2 },
          { quantity: 1, product: 1 },
        ],
      };

      const { status, body } = await request(app.getHttpServer())
        .post('/order/create')
        .send(ex);

      console.log(body);
      expect(status).toBe(201);
    });
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it.todo('Edit user');
    });

    describe('Create bookmark', () => {
      it.todo('Create bookmark');
    });

    describe('Get bookmarks', () => {
      it.todo('Get bookmarks');
    });

    describe('Edit bookmark by id', () => {
      it.todo('Edit bookmark by id');
    });

    describe('Delete bookmark by id', () => {
      it.todo('Delete bookmark by id');
    });
  });
});
