import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommonErrorCode } from '@difuks/common';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { IMockedUser } from 'auth-backend/__e2e__/services/UsersBuilder';
import { Role } from 'auth-backend/User/entities/User';
import { AppBuilder } from 'auth-backend/__e2e__/services/TestAppModuleCreator';

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
      const response = await request(app.getHttpServer())
        .post('/register/basic')
        .send({ email: 'test2', password: '1234567890' });

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
      const response = await request(app.getHttpServer())
        .post('/register/basic')
        .send({
          email: 'testeinvalidpassword@test.com',
          password: '123',
        });

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

  describe('When a user entered an valid email and password', () => {
    it('should return ok and cookie', async () => {
      const response = await request(app.getHttpServer())
        .post('/register/basic')
        .send({
          email: 'testvalidemailandpassword@test.ru',
          password: '1234567890',
        });

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });

    it('should return conflict if user exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/register/basic')
        .send({ email: existUser.email, password: 'some-correct-password' });

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
