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

  const responseUserShape = expect.objectContaining({
    id: expect.any(Number),
    createAt: expect.any(Date),
    updateAt: expect.any(Date),
    firstName: expect.any(String) | expect.any(null),
    lastName: expect.any(String) | expect.any(null),
    email: expect.any(String),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
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
        const { status, body } = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            email: dto.email,
            password: dto.password,
          });
        expect(status).toBe(201);
        // expect(body.user).toStrictEqual(responseUserShape);
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
    });

    describe('Edit user', () => {});
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {});

    describe('Create bookmark', () => {});

    describe('Get bookmarks', () => {});

    describe('Edit bookmark by id', () => {});

    describe('Delete bookmark by id', () => {});
  });

  it.todo('get ready');
});
