import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommonErrorCode } from '@fuks-ru/common';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { IMockedUser } from 'auth-backend/__e2e__/dsl/UsersBuilder';
import { Role } from 'auth-backend/User/entities/User';
import { AppBuilder } from 'auth-backend/__e2e__/dsl/TestAppModuleCreator';

const existUser: IMockedUser = {
  email: 'test@test.com',
  password: '1234567890',
  role: Role.USER,
};

describe('Register', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await AppBuilder.app().withUser(existUser).please();
  });

  describe('When a user entered an invalid email', () => {
    it('should return a validation error', async () => {
      const body = {
        email: 'test2',
        password: '1234567890',
        repeatPassword: '1234567890',
      };

      const response = await request(app.getHttpServer())
        .post('/api/register/basic')
        .send(body);

      expect(response.body).toEqual({
        code: CommonErrorCode.VALIDATION,
        message: expect.any(String),
        data: {
          email: expect.any(Array),
        },
      });
      expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(response.headers['set-cookie']).not.toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });

  describe('When a user entered an invalid password', () => {
    it('should return a validation error', async () => {
      const body = {
        email: 'testeinvalidpassword@test.com',
        password: '123',
        repeatPassword: '123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/register/basic')
        .send(body);

      expect(response.body).toEqual({
        code: CommonErrorCode.VALIDATION,
        message: expect.any(String),
        data: {
          password: expect.any(Array),
        },
      });
      expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(response.headers['set-cookie']).not.toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });

  describe('When a user entered an invalid repeatPassword', () => {
    it('should return a validation error', async () => {
      const body = {
        email: 'testeinvalidpassword@test.com',
        password: '1234567890',
        repeatPassword: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/api/register/basic')
        .send(body);

      expect(response.body).toEqual({
        code: CommonErrorCode.VALIDATION,
        message: expect.any(String),
        data: {
          repeatPassword: expect.any(Array),
        },
      });
      expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(response.headers['set-cookie']).not.toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });

  describe('When a user entered an valid email and password', () => {
    it('should return ok', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/register/basic')
        .send({
          email: 'testvalidemailandpassword@test.ru',
          password: '1234567890',
          repeatPassword: '1234567890',
          redirectFrom: 'https://test.com',
        });

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.body).toEqual({});
    });

    it('should return conflict if user exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/register/basic')
        .send({
          email: existUser.email,
          password: 'some-correct-password',
          repeatPassword: 'some-correct-password',
        });

      expect(response.body).toEqual({
        code: ErrorCode.USER_ALREADY_EXISTS,
        message: expect.any(String),
      });
      expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
      expect(response.headers['set-cookie']).not.toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });
});
