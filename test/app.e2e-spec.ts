import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.useGlobalPipes(
    //   new ValidationPipe({
    //     whitelist: true,
    //   }),
    // );
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signin', () => {});

    describe('Signup', () => {});
  });

  describe('User', () => {
    describe('Get me', () => {});

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
