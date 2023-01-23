import request from 'supertest';
import dbConnection from '../db/index.js';
import CONSTANTS from '../constants.js';
import app from '../../app.js';

const appV1 = '/api/v1';

describe('Auth EndPoinds', () => {
  beforeAll(async () => {
    await dbConnection.clear();
    await dbConnection.connect();
  });
  afterAll(async () => {
    await dbConnection.disConnect();
  });

  const user = {
    username: 'test1@gmail.com',
    email: 'test1@gmail.com',
    password: '123456789',
  };

  describe('Auth Endpoints', () => {
    describe('Sign Up', () => {
      const reqApp = request(app);
      it('POST /signup, must return 400 and user name required prompt ', async () => {
        const res = await request(app).post(`${appV1}/signup`).send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe(CONSTANTS.USER_NAME_REQUIRED_FAILURE);
      });
      it('POST /signup, must return 400 and email required ', async () => {
        const res = await request(app)
          .post(`${appV1}/signup`)
          .send({ username: 'test@gmail.com' });
        expect(res.statusCode).toBe(400);
        // console.log(res.body);
        expect(res.body.message).toBe(CONSTANTS.EMAIL_REQUIRED_FAILURE);
      });
      it('POST /signup, must return 400 and password required ', async () => {
        const res = await request(app)
          .post(`${appV1}/signup`)
          .send({ username: 'test@gmail.com', email: 'test@gmail.com' });
        expect(res.statusCode).toBe(400);
        // console.log(res.body);
        expect(res.body.message).toBe(CONSTANTS.PASSWORD_REQUIRED_FAILURE);
      });
      it('POST /signup, status 202, user must be created ', async () => {
        const res = await request(app).post(`${appV1}/signup`).send(user);
        expect(res.statusCode).toBe(202);
        console.log(res.body);
        expect(res.body.message).toBe(CONSTANTS.USER_SIGN_UP_SUCCESS);
      });
    });
    describe('Login', () => {
      it('POST /login, return 400 and user name required prompt ', async () => {
        const res = await request(app).post(`${appV1}/login`).send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe(CONSTANTS.EMAIL_REQUIRED_FAILURE);
      });
      it('POST /login, must return 400 and password required ', async () => {
        const res = await request(app)
          .post(`${appV1}/login`)
          .send({ username: 'test@gmail.com', email: 'test@gmail.com' });
        expect(res.statusCode).toBe(400);

        expect(res.body.message).toBe(CONSTANTS.PASSWORD_REQUIRED_FAILURE);
      });
      it('POST /login, must return 200 and password required ', async () => {
        const res = await request(app).post(`${appV1}/login`).send(user);
        // console.log(res.body);
        // console.log(res.headers['set-cookie']);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe(CONSTANTS.LOGIN_SUCCESS);
      });
    });
    describe('Logout', () => {
      it('POST /logout, User logout ', async () => {
        const res = await request(app).get(`${appV1}/logout`);
        expect(res.statusCode).toBe(200);
        // console.log(res.body);
        expect(res.body.message).toBe(CONSTANTS.LOGOUT_SUCCESS);
      });
    });
  });
});
