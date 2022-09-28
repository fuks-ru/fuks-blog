import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommonErrorCode } from '@fuks-ru/common';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { AppBuilder } from 'auth-backend/__e2e__/dsl/TestAppModuleCreator';
import { IMockedUser } from 'auth-backend/__e2e__/dsl/UsersBuilder';
import { Role } from 'auth-backend/User/entities/User';

const existUser: IMockedUser = {
  email: 'test@test.com',
  password: '1234567890',
  role: Role.USER,
};

describe('BasicLogin', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await AppBuilder.app().withUser(existUser).please();
  });

  describe('When a user send an invalid email and password', () => {
    it('should return a validate error if empty body', async () => {
      const body = {};

      const response = await request(app.getHttpServer())
        .post('/api/login/basic')
        .send(body);

      expect(response.body).toEqual({
        code: CommonErrorCode.VALIDATION,
        message: expect.any(String),
        data: {
          email: expect.any(Array),
          password: expect.any(Array),
        },
      });
      expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return a unauthorized error if email and password valid', async () => {
      const body = {
        email: 'incorrect@test.com',
        password: 'incorrect',
      };

      const response = await request(app.getHttpServer())
        .post('/api/login/basic')
        .send(body);

      expect(response.body).toEqual({
        code: ErrorCode.UNAUTHORIZED,
        message: expect.any(String),
      });
      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('When a user send valid email and password', () => {
    it('should redirect error and cookie token', async () => {
      const body = {
        email: existUser.email,
        password: existUser.password,
        redirectFrom: 'https://test.com',
      };

      const response = await request(app.getHttpServer())
        .post('/api/login/basic')
        .send(body);

      expect(response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        code: CommonErrorCode.REDIRECT,
        message: expect.any(String),
        redirect: {
          location: 'https://test.com',
        },
      });
      expect(response.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });
});
