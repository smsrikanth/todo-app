import request from 'supertest';
import dbConnection from '../../db/index.js';
import CONSTANTS from '../../constants.js';
import app from '../../../app.js';

const appV1 = '/api/v1';

describe('Todo EndPoints', () => {
  let user1 = {};
  let user2 = {};
  let todo = {};
  let todoId = '';
  let userId = '';
  let agent1 = '';
  let agent2 = '';
  let session1 = '';
  let session2 = '';
  beforeAll(async () => {
    await dbConnection.clear();
    await dbConnection.connect();
    user1 = {
      username: 'test1@gmail.com',
      email: 'test1@gmail.com',
      password: '123456789',
    };
    user2 = {
      username: 'test2@gmail.com',
      email: 'test2@gmail.com',
      password: '123456789',
    };
    todo = {};
    agent1 = request.agent(app);
    agent2 = request.agent(app);
    await agent1.post(`${appV1}/signup`).send(user1);
    await agent2.post(`${appV1}/signup`).send(user2);
    const user1Result = await agent1.post(`${appV1}/login`).send(user1);
    session1 = user1Result.headers['set-cookie'];
    const user2Result = await agent2.post(`${appV1}/login`).send(user2);
    session2 = user2Result.headers['set-cookie'];
    await agent1.set('set-cookie', [session1]);
    await agent2.set('set-cookie', [session2]);
    // console.log({ session1, session2 });
  });
  afterAll(async () => {
    await dbConnection.disConnect();
  });

  describe('Todo Routes', () => {
    it('GET /todos,  Login required to view the todos', async () => {
      const result = await request(app).get(`${appV1}/todos`);
      expect(result.statusCode).toBe(403);
      expect(result.body.message).toBe(CONSTANTS.TOKEN_REQUIRED_FAILURE);
    });

    it('GET /todo, Total todos must be zero', async () => {
      const result = await agent1.get(`${appV1}/todos`);
      expect(result.body.size).toBe(0);
      expect(result.body.size).toBeDefined();
      expect(result.body.todos).toBeDefined();
    });

    it('POST /todos, Title required for crating a todo', async () => {
      const result = await agent1.post(`${appV1}/todos`).send({});
      expect(result.body.message).toBe(CONSTANTS.TITLE_REQUIRED_FAILURE);
    });

    it('POST /todos, Create todo Success', async () => {
      const result = await agent1
        .post(`${appV1}/todos`)
        .send({ title: 'hello' });
      expect(result.body.message).toBe(CONSTANTS.TODO_CREATED_SUCCESS);
    });

    it('GET /todos, todos length must be 1', async () => {
      const result = await agent1.get(`${appV1}/todos`);
      expect(result.body.size).toBeGreaterThan(0);
      expect(result.body.size).toBeDefined();
      expect(result.body.todos).toBeDefined();
      todoId = result.body.todos[0]._id;
    });

    it('DELETE /todos, Unauthorised! Could not delete other user TODO', async () => {
      const result = await agent2.delete(`${appV1}/todos/${todoId}`);
      // console.log(result.headers);
      expect(result.body.message).toBe(CONSTANTS.UNAUTHORISED);
    });
  });
});
