import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommonErrorCode } from '@difuks/common';

import { AppBuilder } from 'auth-backend/__e2e__/services/TestAppModuleCreator';
import { IMockedUser } from 'auth-backend/__e2e__/services/UsersBuilder';
import { Role } from 'auth-backend/User/entities/User';

const existUser: IMockedUser = {
  email: 'test@test.com',
  password: '1234567890',
  role: Role.USER,
};

describe('Login', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await AppBuilder.app().withUser(existUser).please();
  });

  describe('When a user send an invalid email and password', () => {
    it('should return a unauthorized', async () => {
      const response = await request(app.getHttpServer()).post(
        '/basic-auth/login',
      );

      expect(response.body).toEqual({
        code: CommonErrorCode.UNAUTHORIZED,
        message: expect.any(String),
      });
      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('When a user send valid email and password', () => {
    it('should ok and cookie token', async () => {
      const response = await request(app.getHttpServer())
        .post('/basic-auth/login')
        .send({ email: existUser.email, password: existUser.password });

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });
});
